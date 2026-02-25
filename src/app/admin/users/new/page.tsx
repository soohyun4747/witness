import { saveUser } from '@/app/admin/actions';
import { requireSession } from '@/lib/auth';

export default async function UserNew() {
  await requireSession(['ADMIN']);
  return (
    <form action={saveUser} className="card stack" style={{ maxWidth: 420 }}>
      <h1>사용자 추가</h1>
      <div className="field"><label className="field-label" htmlFor="name">이름</label><input id="name" className="input" name="name" required /></div>
      <div className="field"><label className="field-label" htmlFor="email">이메일</label><input id="email" className="input" name="email" required /></div>
      <div className="field"><label className="field-label" htmlFor="role">사용자 종류</label><select id="role" className="select" name="role"><option value="ADMIN">관리자</option><option value="STAFF">연구원</option></select></div>
      <div className="field"><label className="field-label" htmlFor="password">초기 비밀번호</label><input id="password" className="input" name="password" type="password" required /></div>
      <button className="btn">저장</button>
    </form>
  );
}
