import Link from 'next/link';
import { requireSession } from '@/lib/auth';
import { repo } from '@/lib/store';

export default async function DevicesPage() { await requireSession(['ADMIN']); const db = repo.getDb(); return <div><h1>디바이스 관리</h1><Link className="btn" href="/admin/devices/new">디바이스 추가</Link><ul>{db.devices.map((d)=> <li key={d.id}><Link href={`/admin/devices/${d.id}`}>{d.name} ({d.deviceCode})</Link></li>)}</ul></div>; }
