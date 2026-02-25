import BarcodeSvg from '@/components/barcode/BarcodeSvg';
import PrintControls from '@/components/print/PrintControls';
import { requireSession } from '@/lib/auth';
import { barcodeForCase } from '@/lib/barcode';
import { repo } from '@/lib/store';

export default async function WristbandPrint({
  params,
  searchParams,
}: {
  params: Promise<{ caseId: string }>;
  searchParams: Promise<{ researcherName?: string }>;
}) {
  await requireSession(['ADMIN', 'STAFF']);
  const { caseId } = await params;
  const query = await searchParams;
  const db = repo.getDb();
  const c = db.cases.find((x) => x.id === caseId);
  if (!c) return <div>Not found</div>;
  const p = db.patients.find((x) => x.id === c.patientId);
  const hidePII = process.env.PRINT_PII === 'false';
  const researcherName = query.researcherName || '-';

  return <div className="stack">
    <PrintControls />
    <div className="card no-print" style={{ marginBottom: 8, width: 'fit-content' }}>출력 준비 완료</div>
    <div className="card" style={{ width: '90mm' }}>
      <h2>{hidePII ? `${p?.fullName?.[0] ?? ''}**` : p?.fullName}</h2>
      <p>{hidePII ? '차트번호 마스킹' : p?.chartNo}</p>
      <p>Case ID: {caseId}</p>
      <p>연구원: {researcherName}</p>
      <BarcodeSvg value={barcodeForCase(caseId)} />
    </div>
  </div>;
}
