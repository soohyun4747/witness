import './globals.css';
import Link from 'next/link';
import { getSession } from '@/lib/auth';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <html lang="ko">
      <body className="app-shell">
        <header className="topbar">
          <Link href="/admin" className="brand">
            <span className="brand-dot" />
            Witness Admin
          </Link>
          <div className="topbar-user">
            {session ? (
              <>
                <strong>{session.email}</strong>
                <span className="badge">{session.role === 'ADMIN' ? '관리자' : '연구원'}</span>
              </>
            ) : (
              <span className="muted" style={{ fontSize: 13 }}>로그인 필요</span>
            )}
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
