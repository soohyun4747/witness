import BarcodeSvg from '@/components/barcode/BarcodeSvg';
import PrintControls from '@/components/print/PrintControls';
import { requireSession } from '@/lib/auth';
import { barcodeForCase } from '@/lib/barcode';
import { repo } from '@/lib/store';

export default async function WristbandPrint({ params }: { params: Promise<{ caseId: string }> }) {
  await requireSession(['ADMIN', 'STAFF']);
  const { caseId } = await params;
  const db = repo.getDb();
  const c = db.cases.find((x) => x.id === caseId);
  if (!c) return <div>Not found</div>;
  const p = db.patients.find((x) => x.id === c.patientId);
  const hidePII = process.env.PRINT_PII === 'false';
  return <div>
    <PrintControls />
    <div className="card" style={{ width: '90mm' }}>
      <h2>{hidePII ? `${p?.fullName?.[0] ?? ''}**` : p?.fullName}</h2>
      <p>{hidePII ? '차트번호 마스킹' : p?.chartNo}</p>
      <p>Case ID: {caseId}</p>
      <BarcodeSvg value={barcodeForCase(caseId)} />
    </div>
  </div>;
}
