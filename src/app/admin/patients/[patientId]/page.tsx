import { createCaseAction, printSpermBottleDirect, printWristbandDirect } from '@/app/admin/actions';
import PatientCaseTable from '@/components/admin/PatientCaseTable';
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

  const movementLogs = Object.fromEntries(cases.map((c) => {
    const relatedPrints = db.printHistory
      .filter((log) => log.caseId === c.id)
      .sort((a, b) => (a.printedAt < b.printedAt ? -1 : 1))
      .map((log) => `${log.printedAt.slice(0, 16).replace('T', ' ')} - ${log.type} 출력 (${log.printedBy})`);
    return [c.id, [`${c.createdAt.slice(0, 16).replace('T', ' ')} - 케이스 생성`, ...relatedPrints]];
  }));

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
        <PatientCaseTable
          cases={cases}
          logs={db.printHistory}
          movementLogs={movementLogs}
          printSpermBottleAction={printSpermBottleDirect}
          printWristbandAction={printWristbandDirect}
        />
      </div>
    </div>
  );
}
