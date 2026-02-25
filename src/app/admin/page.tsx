import { requireSession } from '@/lib/auth';
import { repo } from '@/lib/store';

export default async function AdminDashboard() {
  await requireSession(['ADMIN', 'STAFF', 'AUDITOR']);
  const db = repo.getDb();
  return (
    <div>
      <h1>관리자 대시보드</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
        <div className="card">환자 {db.patients.length}</div>
        <div className="card">케이스 {db.cases.length}</div>
        <div className="card">샘플 {db.samples.length}</div>
        <div className="card">디바이스 {db.devices.length}</div>
      </div>
    </div>
  );
}
