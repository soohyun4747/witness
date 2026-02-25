import { saveDevice } from '@/app/admin/actions';
import { requireSession } from '@/lib/auth';
import { repo } from '@/lib/store';

export default async function DeviceNew() { await requireSession(['ADMIN']); const stations = repo.getDb().stations; return <form action={saveDevice} className="card" style={{maxWidth:420, display:'grid', gap:8}}><h1>디바이스 추가</h1><input className="input" name="name" placeholder="이름" required/><input className="input" name="deviceCode" placeholder="코드" required/><select className="select" name="assignedStationId"><option value="">미지정</option>{stations.map((s)=><option key={s.id} value={s.id}>{s.name}</option>)}</select><button className="btn">저장</button></form>; }
