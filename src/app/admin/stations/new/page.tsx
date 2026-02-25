import { saveStation } from '@/app/admin/actions';
import { requireSession } from '@/lib/auth';

export default async function StationNew() {
  await requireSession(['ADMIN']);
  return (
    <form action={saveStation} className="card stack" style={{ maxWidth: 420 }}>
      <h1>구역 추가</h1>
      <div className="field"><label className="field-label" htmlFor="name">구역 이름</label><input id="name" className="input" name="name" required /></div>
      <div className="field"><label className="field-label" htmlFor="description">설명</label><textarea id="description" className="textarea" name="description" /></div>
      <button className="btn">저장</button>
    </form>
  );
}
