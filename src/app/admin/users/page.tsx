import { deactivateUser, saveUser } from '@/app/admin/actions';
import Modal from '@/components/ui/Modal';
import { requireSession } from '@/lib/auth';
import { repo } from '@/lib/store';

const roleLabel: Record<string, string> = {
  ADMIN: '관리자',
  STAFF: '연구원',
  AUDITOR: '연구원',
  SCANNER: '연구원',
};

export default async function UsersPage() {
  await requireSession(['ADMIN']);
  const db = repo.getDb();

  return (
    <div className="stack">
      <div className="page-header">
        <h1 className="page-title">사용자 관리</h1>
        <Modal title="사용자 추가" triggerLabel="사용자 추가">
          <form action={saveUser} className="stack" style={{ minWidth: 340 }}>
            <div className="field"><label className="field-label" htmlFor="name">이름</label><input id="name" className="input" name="name" required /></div>
            <div className="field"><label className="field-label" htmlFor="email">이메일</label><input id="email" className="input" name="email" required /></div>
            <div className="field"><label className="field-label" htmlFor="role">사용자 종류</label><select id="role" className="select" name="role"><option value="ADMIN">관리자</option><option value="STAFF">연구원</option></select></div>
            <div className="field"><label className="field-label" htmlFor="password">초기 비밀번호</label><input id="password" className="input" name="password" type="password" required /></div>
            <button className="btn">저장</button>
          </form>
        </Modal>
      </div>

      <div className="card">
        <table>
          <thead><tr><th>이름</th><th>이메일</th><th>사용자 종류</th><th>상태</th><th /></tr></thead>
          <tbody>
            {db.users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{roleLabel[u.role] || '연구원'}</td>
                <td>{u.isActive ? '활성' : '비활성'}</td>
                <td>
                  {u.isActive && (
                    <form action={deactivateUser}>
                      <input type="hidden" name="id" value={u.id} />
                      <button className="btn" type="submit">비활성화</button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
