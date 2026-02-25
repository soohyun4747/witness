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
  const cases = db.cases.filter((c) => c.patientId === patientId).sort((a,b)=> a.status === 'ACTIVE' ? -1 : b.status === 'ACTIVE' ? 1 : 0);
  return <div><h1>{patient.fullName}</h1><p>차트번호: {patient.chartNo || '-'}</p><p>생년월일: {patient.birthDate || '-'}</p>
    <form action={async ()=>{'use server'; await createCaseAction(patientId);}}><button className="btn">새 케이스 생성</button></form>
    <h2>케이스</h2><ul>{cases.map((c) => <li key={c.id}><Link href={`/admin/cases/${c.id}`}>{c.id} - {c.status}</Link></li>)}</ul>
  </div>;
}
