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
    .sort((a, b) => (a.status === 'ACTIVE' ? -1 : b.status === 'ACTIVE' ? 1 : 0));

  return (
    <div className="stack">
      <div className="card stack">
        <h1 className="page-title" style={{ marginBottom: 0 }}>{patient.fullName}</h1>
        <div className="row muted">
          <span>차트번호: {patient.chartNo || '-'}</span>
          <span>생년월일: {patient.birthDate || '-'}</span>
        </div>
        <form action={async () => { 'use server'; await createCaseAction(patientId); }}>
          <button className="btn">새 케이스 생성</button>
        </form>
      </div>

      <div className="card stack">
        <h2 style={{ margin: 0 }}>케이스</h2>
        <ul className="stack" style={{ margin: 0, paddingInlineStart: 20 }}>
          {cases.map((c) => (
            <li key={c.id}>
              <Link href={`/admin/cases/${c.id}`}>{c.id}</Link> <span className={`badge ${c.status === 'ACTIVE' ? 'active' : ''}`}>{c.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
