import { requireSession } from '@/lib/auth';
import { repo } from '@/lib/store';

export default async function AdminDashboard() {
  await requireSession(['ADMIN', 'STAFF', 'AUDITOR']);
  const db = repo.getDb();

  return (
    <div className="stack">
      <div className="page-header">
        <h1 className="page-title">관리자 대시보드</h1>
        <span className="muted">실시간 운영 요약</span>
      </div>
      <div className="kpi-grid">
        <div className="card"><div className="muted">환자</div><h2>{db.patients.length}</h2></div>
        <div className="card"><div className="muted">케이스</div><h2>{db.cases.length}</h2></div>
        <div className="card"><div className="muted">샘플</div><h2>{db.samples.length}</h2></div>
        <div className="card"><div className="muted">디바이스</div><h2>{db.devices.length}</h2></div>
      </div>
    </div>
  );
}
