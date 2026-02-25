import { saveDevice } from '@/app/admin/actions';
import { requireSession } from '@/lib/auth';
import { repo } from '@/lib/store';

export default async function DeviceDetail({ params }: { params: Promise<{ deviceId: string }> }) {
  await requireSession(['ADMIN']);
  const { deviceId } = await params;
  const db = repo.getDb();
  const d = db.devices.find((x) => x.id === deviceId);
  if (!d) return <div>Not found</div>;

  return (
    <form action={saveDevice} className="card stack" style={{ maxWidth: 420 }}>
      <h1>디바이스 수정</h1>
      <input type="hidden" name="id" value={d.id} />
      <div className="field"><label className="field-label" htmlFor="name">디바이스 이름</label><input id="name" className="input" name="name" defaultValue={d.name} /></div>
      <div className="field"><label className="field-label" htmlFor="deviceCode">디바이스 코드</label><input id="deviceCode" className="input" name="deviceCode" defaultValue={d.deviceCode} /></div>
      <div className="field"><label className="field-label" htmlFor="assignedStationId">배정 구역</label><select id="assignedStationId" className="select" name="assignedStationId" defaultValue={d.assignedStationId}><option value="">미지정</option>{db.stations.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select></div>
      <button className="btn">저장</button>
    </form>
  );
}
