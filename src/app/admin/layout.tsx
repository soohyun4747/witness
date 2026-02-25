import NavLink from '@/components/ui/NavLink';

const navItems = [
  { href: '/admin', label: '대시보드' },
  { href: '/admin/patients', label: '환자' },
  { href: '/admin/stations', label: '구역 · 디바이스' },
  { href: '/admin/users', label: '사용자' },
  { href: '/logout', label: '로그아웃' },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-grid">
      <aside className="sidebar">
        <nav className="nav">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>
      </aside>
      <main className="page-wrap">{children}</main>
    </div>
  );
}
