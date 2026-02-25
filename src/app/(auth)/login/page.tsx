import { loginAction } from '@/app/admin/actions';

export default function LoginPage() {
  return (
    <main style={{ maxWidth: 360, margin: '50px auto' }}>
      <h1>로그인</h1>
      <form action={loginAction} className="card" style={{ display: 'grid', gap: 8 }}>
        <input className="input" name="email" placeholder="email" defaultValue="admin@local" />
        <input className="input" name="password" type="password" placeholder="password" />
        <button className="btn" type="submit">로그인</button>
      </form>
    </main>
  );
}
