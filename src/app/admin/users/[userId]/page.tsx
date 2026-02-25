import { saveUser } from '@/app/admin/actions';
import { requireSession } from '@/lib/auth';
import { repo } from '@/lib/store';

export default async function UserDetail({ params }: { params: Promise<{ userId: string }> }) { await requireSession(['ADMIN']); const { userId } = await params; const u = repo.getDb().users.find((x)=>x.id===userId); if(!u) return <div>Not found</div>; return <form action={saveUser} className="card" style={{maxWidth:420, display:'grid', gap:8}}><h1>사용자 수정</h1><input type="hidden" name="id" value={u.id}/><input className="input" name="name" defaultValue={u.name}/><input className="input" name="email" defaultValue={u.email}/><select className="select" name="role" defaultValue={u.role}><option>ADMIN</option><option>STAFF</option><option>AUDITOR</option><option>SCANNER</option></select><input className="input" name="password" type="password" placeholder="변경시에만 입력"/><button className="btn">저장</button></form>; }
