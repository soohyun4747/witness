import { saveStation } from '@/app/admin/actions';
import { requireSession } from '@/lib/auth';
import { repo } from '@/lib/store';

export default async function StationDetail({ params }: { params: Promise<{ stationId: string }> }) {
  await requireSession(['ADMIN']);
  const { stationId } = await params;
  const s = repo.getDb().stations.find((x) => x.id === stationId);
  if (!s) return <div>Not found</div>;

  return (
    <form action={saveStation} className="card stack" style={{ maxWidth: 420 }}>
      <h1>구역 수정</h1>
      <input type="hidden" name="id" value={s.id} />
      <div className="field"><label className="field-label" htmlFor="name">구역 이름</label><input id="name" className="input" name="name" defaultValue={s.name} /></div>
      <div className="field"><label className="field-label" htmlFor="description">설명</label><textarea id="description" className="textarea" name="description" defaultValue={s.description} /></div>
      <button className="btn">저장</button>
    </form>
  );
}
