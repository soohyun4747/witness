import { loginAction } from '@/app/admin/actions';

export default function LoginPage() {
  return (
    <main className="page-wrap" style={{ maxWidth: 420, margin: '56px auto' }}>
      <div className="card stack">
        <div>
          <p className="badge" style={{ marginBottom: 10 }}>WITNESS ACCESS</p>
          <h1 className="page-title">관리자 로그인</h1>
          <p className="muted">로컬 병원 서버 계정으로 로그인하세요.</p>
        </div>
        <form action={loginAction} className="stack">
          <input className="input" name="email" placeholder="email" defaultValue="admin@local" />
          <input className="input" name="password" type="password" placeholder="password" />
          <button className="btn" type="submit">로그인</button>
        </form>
      </div>
    </main>
  );
}
