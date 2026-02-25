import Link from 'next/link';
import { requireSession } from '@/lib/auth';
import { repo } from '@/lib/store';

export default async function StationsPage() {
  await requireSession(['ADMIN']);
  const db = repo.getDb();
  return <div><h1>구역 관리</h1><Link className="btn" href="/admin/stations/new">구역 추가</Link><ul>{db.stations.map((s)=> <li key={s.id}><Link href={`/admin/stations/${s.id}`}>{s.name}</Link></li>)}</ul></div>;
}
