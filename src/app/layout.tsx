import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <header style={{ padding: 12, borderBottom: '1px solid #ddd', background: '#fff' }}>
          <Link href="/admin">Witness</Link>
        </header>
        {children}
      </body>
    </html>
  );
}
