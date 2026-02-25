import { saveUser } from '@/app/admin/actions';
import { requireSession } from '@/lib/auth';
import { repo } from '@/lib/store';

export default async function UserDetail({ params }: { params: Promise<{ userId: string }> }) {
  await requireSession(['ADMIN']);
  const { userId } = await params;
  const u = repo.getDb().users.find((x) => x.id === userId);
  if (!u) return <div>Not found</div>;

  return (
    <form action={saveUser} className="card stack" style={{ maxWidth: 420 }}>
      <h1>사용자 수정</h1>
      <input type="hidden" name="id" value={u.id} />
      <div className="field"><label className="field-label" htmlFor="name">이름</label><input id="name" className="input" name="name" defaultValue={u.name} /></div>
      <div className="field"><label className="field-label" htmlFor="email">이메일</label><input id="email" className="input" name="email" defaultValue={u.email} /></div>
      <div className="field"><label className="field-label" htmlFor="role">사용자 종류</label><select id="role" className="select" name="role" defaultValue={u.role === 'ADMIN' ? 'ADMIN' : 'STAFF'}><option value="ADMIN">관리자</option><option value="STAFF">연구원</option></select></div>
      <div className="field"><label className="field-label" htmlFor="password">비밀번호(변경 시)</label><input id="password" className="input" name="password" type="password" /></div>
      <button className="btn">저장</button>
    </form>
  );
}
