import Link from 'next/link';
import { createCaseAction } from '@/app/admin/actions';
import { requireSession } from '@/lib/auth';
import { repo } from '@/lib/store';

export default async function PatientDetail({ params }: { params: Promise<{ patientId: string }> }) {
  await requireSession(['ADMIN', 'STAFF', 'AUDITOR']);
  const { patientId } = await params;
  const db = repo.getDb();
  const patient = db.patients.find((p) => p.id === patientId);
  if (!patient) return <div>Not found</div>;

  const cases = db.cases
    .filter((c) => c.patientId === patientId)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  return (
    <div className="stack">
      <div className="card stack">
        <h1 className="page-title" style={{ marginBottom: 0 }}>{patient.fullName}</h1>
        <div className="row muted">
          <span>차트번호: {patient.chartNo || '-'}</span>
          <span>생년월일: {patient.birthDate || '-'}</span>
          <span>연락처: {patient.phone || '-'}</span>
        </div>
        <form action={async () => { 'use server'; await createCaseAction(patientId); }}>
          <button className="btn">새 케이스 생성</button>
        </form>
      </div>

      <div className="card stack">
        <h2 style={{ margin: 0 }}>케이스 목록</h2>
        <table>
          <thead>
            <tr>
              <th>날짜</th>
              <th>케이스 번호</th>
              <th>상태</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => (
              <tr key={c.id}>
                <td>{c.createdAt.slice(0, 10)}</td>
                <td><Link href={`/admin/cases/${c.id}`}>{c.id.slice(0, 8)}</Link></td>
                <td><span className={`badge ${c.status === 'ACTIVE' ? 'active' : ''}`}>{c.status}</span></td>
                <td>
                  <div className="actions-cell">
                    <Link className="btn btn-link" href={`/admin/cases/${c.id}/print/wristband`}>팔찌 바코드 출력</Link>
                    <Link className="btn btn-link" href={`/admin/cases/${c.id}`}>정자 보틀 라벨 출력</Link>
                    <Link className="btn btn-link btn-muted" href={`/admin/cases/${c.id}`}>동선 확인</Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
