import { saveWristbandPrint } from '@/app/admin/actions';
import BarcodeSvg from '@/components/barcode/BarcodeSvg';
import PrintControls from '@/components/print/PrintControls';
import { getSession, requireSession } from '@/lib/auth';
import { barcodeForCase } from '@/lib/barcode';
import { repo } from '@/lib/store';

export default async function WristbandPrint({ params }: { params: Promise<{ caseId: string }> }) {
  await requireSession(['ADMIN', 'STAFF']);
  const session = await getSession();
  const { caseId } = await params;
  const db = repo.getDb();
  const c = db.cases.find((x) => x.id === caseId);
  if (!c) return <div>Not found</div>;
  const p = db.patients.find((x) => x.id === c.patientId);
  const hidePII = process.env.PRINT_PII === 'false';

  return <div className="stack">
    <PrintControls />
    <form action={async (formData) => { 'use server'; await saveWristbandPrint(caseId, String(formData.get('printedBy') || '')); }} className="card stack no-print" style={{ maxWidth: 420 }}>
      <div className="field">
        <label className="field-label" htmlFor="printedBy">출력 연구원 이름</label>
        <input id="printedBy" className="input" name="printedBy" defaultValue={session?.email || ''} required />
      </div>
      <button className="btn" type="submit">출력 기록 저장</button>
    </form>
    <div className="card" style={{ width: '90mm' }}>
      <h2>{hidePII ? `${p?.fullName?.[0] ?? ''}**` : p?.fullName}</h2>
      <p>{hidePII ? '차트번호 마스킹' : p?.chartNo}</p>
      <p>Case ID: {caseId}</p>
      <BarcodeSvg value={barcodeForCase(caseId)} />
    </div>
  </div>;
}
