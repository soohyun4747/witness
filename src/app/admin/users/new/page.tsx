import { saveUser } from '@/app/admin/actions';
import { requireSession } from '@/lib/auth';

export default async function UserNew() { await requireSession(['ADMIN']); return <form action={saveUser} className="card" style={{maxWidth:420, display:'grid', gap:8}}><h1>사용자 추가</h1><input className="input" name="name" placeholder="이름" required/><input className="input" name="email" placeholder="이메일" required/><select className="select" name="role"><option>ADMIN</option><option>STAFF</option><option>AUDITOR</option><option>SCANNER</option></select><input className="input" name="password" type="password" placeholder="초기 비밀번호" required/><button className="btn">저장</button></form>; }
