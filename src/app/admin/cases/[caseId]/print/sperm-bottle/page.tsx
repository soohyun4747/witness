import BarcodeSvg from '@/components/barcode/BarcodeSvg';
import PrintControls from '@/components/print/PrintControls';
import { requireSession } from '@/lib/auth';
import { repo } from '@/lib/store';

export default async function SpermBottlePrint({ params, searchParams }: { params: Promise<{ caseId: string }>; searchParams: Promise<{ count?: string; researcherName?: string }> }) {
  await requireSession(['ADMIN', 'STAFF']);
  const { caseId } = await params;
  const query = await searchParams;
  const count = Number(query.count || 1);
  const researcherName = query.researcherName || '';
  const db = repo.getDb();
  const samples = db.samples.filter((s) => s.caseId === caseId).slice(-count);

  return <div>
    <PrintControls />
    <div className="card no-print" style={{ marginBottom: 8, width: 'fit-content' }}>출력 준비 완료</div>
    <div style={{ display: 'grid', gap: 8 }}>
      {samples.map((s) => (
        <div key={s.id} className="card" style={{ width: '60mm' }}>
          <h4>Semen Sample</h4>
          <p>Case: {caseId}</p>
          <p>Serial: {s.serialNo}</p>
          <p>연구원: {researcherName || '-'}</p>
          <BarcodeSvg value={s.barcodeValue} />
        </div>
      ))}
    </div>
  </div>;
}
