import { createPatientAction } from '@/app/admin/actions';
import { requireSession } from '@/lib/auth';

export default async function NewPatientPage() {
  await requireSession(['ADMIN', 'STAFF']);
  return <div><h1>환자 추가</h1><form action={createPatientAction} className="card" style={{ display: 'grid', gap: 8, maxWidth: 520 }}>
    <input className="input" name="fullName" placeholder="이름" required />
    <input className="input" name="chartNo" placeholder="차트번호" />
    <input className="input" name="birthDate" type="date" />
    <input className="input" name="phone" placeholder="연락처" />
    <textarea className="textarea" name="memo" placeholder="메모" />
    <button className="btn" type="submit">저장</button>
  </form></div>;
}
