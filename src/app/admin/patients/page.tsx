import Link from 'next/link';
import { requireSession } from '@/lib/auth';
import { repo } from '@/lib/store';

export default async function PatientsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  await requireSession(['ADMIN', 'STAFF', 'AUDITOR']);
  const q = (await searchParams).q?.toLowerCase() || '';
  const db = repo.getDb();
  const rows = db.patients.filter((p) => !q || p.fullName.toLowerCase().includes(q) || p.chartNo?.toLowerCase().includes(q));

  return (
    <div className="stack">
      <div className="page-header">
        <h1 className="page-title">환자 관리</h1>
        <Link className="btn" href="/admin/patients/new">환자 추가</Link>
      </div>
      <form className="card"><input className="input" name="q" placeholder="이름/차트번호 검색" defaultValue={q} /></form>
      <table>
        <thead><tr><th>이름</th><th>차트번호</th><th>생년월일</th><th>최근 상태</th><th>생성일</th></tr></thead>
        <tbody>
          {rows.map((p) => {
            const cases = db.cases.filter((c) => c.patientId === p.id);
            const latest = cases.at(-1)?.status || '-';
            return (
              <tr key={p.id}>
                <td><Link href={`/admin/patients/${p.id}`}>{p.fullName}</Link></td>
                <td>{p.chartNo || '-'}</td>
                <td>{p.birthDate || '-'}</td>
                <td><span className={`badge ${latest === 'ACTIVE' ? 'active' : ''}`}>{latest}</span></td>
                <td>{p.createdAt.slice(0, 10)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
