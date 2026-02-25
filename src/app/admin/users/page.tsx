import Link from 'next/link';
import { deactivateUser } from '@/app/admin/actions';
import { requireSession } from '@/lib/auth';
import { repo } from '@/lib/store';

export default async function UsersPage() { await requireSession(['ADMIN']); const db = repo.getDb(); return <div><h1>사용자 관리</h1><Link className="btn" href="/admin/users/new">사용자 추가</Link><table><thead><tr><th>이름</th><th>이메일</th><th>권한</th><th>상태</th><th></th></tr></thead><tbody>{db.users.map((u)=><tr key={u.id}><td><Link href={`/admin/users/${u.id}`}>{u.name}</Link></td><td>{u.email}</td><td>{u.role}</td><td>{u.isActive ? '활성':'비활성'}</td><td>{u.isActive && <form action={deactivateUser}><input type="hidden" name="id" value={u.id}/><button className="btn">비활성화</button></form>}</td></tr>)}</tbody></table></div>; }
