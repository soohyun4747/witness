'use client';

import Modal from '@/components/ui/Modal';

export default function PatientCreateModal({ action }: { action: (formData: FormData) => void }) {
  return (
    <Modal title="환자 추가" triggerLabel="환자 추가">
      <form action={action} className="stack" style={{ minWidth: 340 }}>
        <div className="field"><label className="field-label" htmlFor="fullName">이름</label><input id="fullName" className="input" name="fullName" required /></div>
        <div className="field"><label className="field-label" htmlFor="chartNo">차트번호</label><input id="chartNo" className="input" name="chartNo" /></div>
        <div className="field"><label className="field-label" htmlFor="birthDate">생년월일</label><input id="birthDate" className="input" name="birthDate" type="date" /></div>
        <div className="field"><label className="field-label" htmlFor="phone">연락처</label><input id="phone" className="input" name="phone" /></div>
        <div className="field"><label className="field-label" htmlFor="memo">메모</label><textarea id="memo" className="textarea" name="memo" /></div>
        <button className="btn" type="submit">저장</button>
      </form>
    </Modal>
  );
}
