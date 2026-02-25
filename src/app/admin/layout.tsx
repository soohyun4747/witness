import Link from 'next/link';
import { getSession } from '@/lib/auth';

const navItems = [
  { href: '/admin', label: '대시보드' },
  { href: '/admin/patients', label: '환자' },
  { href: '/admin/stations', label: '구역' },
  { href: '/admin/devices', label: '디바이스' },
  { href: '/admin/users', label: '사용자' },
  { href: '/logout', label: '로그아웃' },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <div className="admin-grid">
      <aside className="sidebar">
        <div className="user-card">
          <div style={{ fontWeight: 700, color: '#e2e8f0' }}>{session?.email}</div>
          <div>{session?.email}</div>
          <span className="badge" style={{ marginTop: 8 }}>{session?.role}</span>
        </div>
        <nav className="nav">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="page-wrap">{children}</main>
    </div>
  );
}
