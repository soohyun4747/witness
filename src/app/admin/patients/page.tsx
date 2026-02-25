import { createPatientAction } from '@/app/admin/actions';
import PatientCreateModal from '@/components/admin/PatientCreateModal';
import { requireSession } from '@/lib/auth';
import { repo } from '@/lib/store';
import Link from 'next/link';

export default async function PatientsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  await requireSession(['ADMIN', 'STAFF', 'AUDITOR']);
  const q = (await searchParams).q?.toLowerCase() || '';
  const db = repo.getDb();
  const rows = db.patients.filter((p) => !q || p.fullName.toLowerCase().includes(q) || p.chartNo?.toLowerCase().includes(q));

  return (
    <div className="stack">
      <div className="page-header">
        <h1 className="page-title">환자 관리</h1>
        <PatientCreateModal action={createPatientAction} />
      </div>

      <form className="card stack">
        <div className="field">
          <label className="field-label" htmlFor="q">검색</label>
          <input id="q" className="input" name="q" placeholder="이름/차트번호 검색" defaultValue={q} />
        </div>
      </form>

      <table>
        <thead><tr><th>이름</th><th>차트번호</th><th>생년월일</th><th>최근 상태</th><th>생성일</th></tr></thead>
        <tbody>
          {rows.map((p) => {
            const cases = db.cases.filter((c) => c.patientId === p.id);
            const latest = cases.at(-1)?.status || '-';
            const detailHref = `/admin/patients/${p.id}`;
            return (
              <tr key={p.id}>
                <td><Link className="table-row-link" href={detailHref}>{p.fullName}</Link></td>
                <td><Link className="table-row-link" href={detailHref}>{p.chartNo || '-'}</Link></td>
                <td><Link className="table-row-link" href={detailHref}>{p.birthDate || '-'}</Link></td>
                <td><Link className="table-row-link" href={detailHref}><span className={`badge ${latest === 'ACTIVE' ? 'active' : ''}`}>{latest}</span></Link></td>
                <td><Link className="table-row-link" href={detailHref}>{p.createdAt.slice(0, 10)}</Link></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
