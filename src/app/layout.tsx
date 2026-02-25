import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="app-shell">
        <header className="topbar">
          <Link href="/admin" className="brand">
            <span className="brand-dot" />
            Witness Admin
          </Link>
          <span className="muted" style={{ fontSize: 13 }}>On-prem Hospital Workflow</span>
        </header>
        {children}
      </body>
    </html>
  );
}
