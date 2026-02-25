import { markSamplesPrinted } from '@/app/admin/actions';
import BarcodeSvg from '@/components/barcode/BarcodeSvg';
import PrintControls from '@/components/print/PrintControls';
import { requireSession } from '@/lib/auth';
import { repo } from '@/lib/store';

export default async function SpermBottlePrint({ params, searchParams }: { params: Promise<{ caseId: string }>; searchParams: Promise<{ count?: string }> }) {
  await requireSession(['ADMIN', 'STAFF']);
  const { caseId } = await params;
  const count = Number((await searchParams).count || 1);
  const db = repo.getDb();
  const samples = db.samples.filter((s) => s.caseId === caseId).slice(-count);
  return <div>
    <PrintControls />
    <form action={async () => { 'use server'; await markSamplesPrinted(samples.map((s) => s.id)); }} className="no-print" style={{ marginBottom: 8 }}>
      <button className="btn" type="submit">인쇄 완료</button>
    </form>
    <div style={{ display: 'grid', gap: 8 }}>
    {samples.map((s) => <div key={s.id} className="card" style={{ width: '60mm' }}><h4>Semen Sample</h4><p>Case: {caseId}</p><p>Serial: {s.serialNo}</p><BarcodeSvg value={s.barcodeValue} /></div>)}
    </div>
  </div>;
}
