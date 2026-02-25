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
  return <div>
    <h1>케이스 {c.id}</h1>
    <p>환자: {p?.fullName}</p>
    <p>상태: {c.status}</p>
    <div className="card" style={{ maxWidth: 400, display: 'grid', gap: 8 }}>
      <h2>출력</h2>
      <Link className="btn" href={`/admin/cases/${caseId}/print/wristband`}>팔찌 바코드 출력</Link>
      <form action={createSamplesAndRedirect} style={{ display: 'grid', gap: 8 }}>
        <input type="hidden" name="caseId" value={caseId} />
        <label>정자 보틀 라벨 수량(1~10)</label>
        <input className="input" name="count" type="number" min={1} max={10} defaultValue={1} />
        <button className="btn" type="submit">정자 보틀 라벨 출력</button>
      </form>
    </div>
  </div>;
}
