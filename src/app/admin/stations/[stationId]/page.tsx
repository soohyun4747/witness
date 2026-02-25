import { saveStation } from '@/app/admin/actions';
import { requireSession } from '@/lib/auth';
import { repo } from '@/lib/store';

export default async function StationDetail({ params }: { params: Promise<{ stationId: string }> }) { await requireSession(['ADMIN']); const { stationId } = await params; const s = repo.getDb().stations.find((x)=>x.id===stationId); if(!s) return <div>Not found</div>; return <form action={saveStation} className="card" style={{maxWidth:420, display:'grid', gap:8}}><h1>구역 수정</h1><input type="hidden" name="id" value={s.id}/><input className="input" name="name" defaultValue={s.name}/><textarea className="textarea" name="description" defaultValue={s.description}/><button className="btn">저장</button></form>; }
