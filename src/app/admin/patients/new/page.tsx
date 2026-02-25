import { createPatientAction } from '@/app/admin/actions';
import { requireSession } from '@/lib/auth';

export default async function NewPatientPage() {
  await requireSession(['ADMIN', 'STAFF']);
  return (
    <div className="stack" style={{ maxWidth: 620 }}>
      <h1 className="page-title">환자 추가</h1>
      <form action={createPatientAction} className="card stack">
        <div className="field"><label className="field-label" htmlFor="fullName">이름</label><input id="fullName" className="input" name="fullName" required /></div>
        <div className="field"><label className="field-label" htmlFor="chartNo">차트번호</label><input id="chartNo" className="input" name="chartNo" /></div>
        <div className="field"><label className="field-label" htmlFor="birthDate">생년월일</label><input id="birthDate" className="input" name="birthDate" type="date" /></div>
        <div className="field"><label className="field-label" htmlFor="phone">연락처</label><input id="phone" className="input" name="phone" /></div>
        <div className="field"><label className="field-label" htmlFor="memo">메모</label><textarea id="memo" className="textarea" name="memo" /></div>
        <button className="btn" type="submit">저장</button>
      </form>
    </div>
  );
}
