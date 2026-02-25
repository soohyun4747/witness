import Link from 'next/link';
import { getSession } from '@/lib/auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: '100vh' }}>
      <aside style={{ borderRight: '1px solid #ddd', padding: 12, background: '#fff' }}>
        <p><b>{session?.email}</b> ({session?.role})</p>
        <nav style={{ display: 'grid', gap: 6 }}>
          <Link href="/admin">대시보드</Link>
          <Link href="/admin/patients">환자</Link>
          <Link href="/admin/stations">구역</Link>
          <Link href="/admin/devices">디바이스</Link>
          <Link href="/admin/users">사용자</Link>
          <Link href="/logout">로그아웃</Link>
        </nav>
      </aside>
      <main>{children}</main>
    </div>
  );
}
