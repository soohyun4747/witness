import { saveDevice } from '@/app/admin/actions';
import { requireSession } from '@/lib/auth';
import { repo } from '@/lib/store';

export default async function DeviceNew() {
  await requireSession(['ADMIN']);
  const stations = repo.getDb().stations;

  return (
    <form action={saveDevice} className="card stack" style={{ maxWidth: 420 }}>
      <h1>디바이스 추가</h1>
      <div className="field"><label className="field-label" htmlFor="name">디바이스 이름</label><input id="name" className="input" name="name" required /></div>
      <div className="field"><label className="field-label" htmlFor="deviceCode">디바이스 코드</label><input id="deviceCode" className="input" name="deviceCode" required /></div>
      <div className="field"><label className="field-label" htmlFor="assignedStationId">배정 구역</label><select id="assignedStationId" className="select" name="assignedStationId"><option value="">미지정</option>{stations.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select></div>
      <button className="btn">저장</button>
    </form>
  );
}
