import Link from 'next/link';
import { createSamplesAndRedirect } from '@/app/admin/actions';
import { requireSession } from '@/lib/auth';
import { repo } from '@/lib/store';

export default async function CaseDetail({ params }: { params: Promise<{ caseId: string }> }) {
  await requireSession(['ADMIN', 'STAFF', 'AUDITOR']);
  const { caseId } = await params;
  const db = repo.getDb();
  const c = db.cases.find((x) => x.id === caseId);
  if (!c) return <div>Not found</div>;
  const p = db.patients.find((x) => x.id === c.patientId);

  return (
    <div className="stack" style={{ maxWidth: 720 }}>
      <div className="card stack">
        <h1 className="page-title" style={{ marginBottom: 2 }}>케이스</h1>
        <p className="muted" style={{ margin: 0 }}>{c.id}</p>
        <div className="row">
          <span className="badge">환자: {p?.fullName}</span>
          <span className={`badge ${c.status === 'ACTIVE' ? 'active' : ''}`}>상태: {c.status}</span>
        </div>
      </div>

      <div className="card stack">
        <h2 style={{ margin: 0 }}>출력</h2>
        <Link className="btn" href={`/admin/cases/${caseId}/print/wristband`}>팔찌 바코드 출력</Link>
        <form action={createSamplesAndRedirect} className="stack">
          <input type="hidden" name="caseId" value={caseId} />
          <label className="muted">정자 보틀 라벨 수량 (1~10)</label>
          <input className="input" name="count" type="number" min={1} max={10} defaultValue={1} />
          <button className="btn" type="submit">정자 보틀 라벨 출력</button>
        </form>
      </div>
    </div>
  );
}
