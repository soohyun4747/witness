import { saveStation } from '@/app/admin/actions';
import { requireSession } from '@/lib/auth';

export default async function StationNew() { await requireSession(['ADMIN']); return <form action={saveStation} className="card" style={{ maxWidth: 420, display:'grid', gap:8 }}><h1>구역 추가</h1><input className="input" name="name" placeholder="이름" required/><textarea className="textarea" name="description"/><button className="btn">저장</button></form>; }
