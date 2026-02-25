'use client';

import Link from 'next/link';
import Modal from '@/components/ui/Modal';
import { PrintHistory } from '@/lib/types';

interface CaseRow {
  id: string;
  status: string;
  createdAt: string;
}

export default function PatientCaseTable({
  cases,
  logs,
  movementLogs,
  printAction,
}: {
  cases: CaseRow[];
  logs: PrintHistory[];
  movementLogs: Record<string, string[]>;
  printAction: (formData: FormData) => void;
}) {
  return (
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
        {cases.map((c) => {
          const caseLogs = logs.filter((l) => l.caseId === c.id).sort((a, b) => (a.printedAt < b.printedAt ? 1 : -1));
          const caseMovement = movementLogs[c.id] || ['동선 기록이 없습니다.'];

          return (
            <tr key={c.id}>
              <td>{c.createdAt.slice(0, 10)}</td>
              <td>{c.id.slice(0, 8)}</td>
              <td><span className={`badge ${c.status === 'ACTIVE' ? 'active' : ''}`}>{c.status}</span></td>
              <td>
                <div className="actions-cell">
                  <Link className="btn btn-link" href={`/admin/cases/${c.id}/print/wristband`}>팔찌 바코드 출력</Link>

                  <Modal title="정자 보틀 라벨 출력" triggerLabel="정자 보틀 라벨 출력" triggerClassName="btn btn-link">
                    <form action={printAction} className="stack" style={{ minWidth: 320 }}>
                      <input type="hidden" name="caseId" value={c.id} />
                      <div className="field"><label className="field-label" htmlFor={`researcher-${c.id}`}>연구원 이름</label><input id={`researcher-${c.id}`} className="input" name="researcherName" required /></div>
                      <div className="field"><label className="field-label" htmlFor={`count-${c.id}`}>출력 수량(1~10)</label><input id={`count-${c.id}`} className="input" name="count" type="number" min={1} max={10} defaultValue={1} /></div>
                      <button className="btn" type="submit">바로 출력</button>
                    </form>
                  </Modal>

                  <Modal title="출력 로그" triggerLabel="출력 로그" triggerClassName="btn btn-link btn-muted">
                    <div className="stack" style={{ minWidth: 360 }}>
                      {caseLogs.length === 0 ? (
                        <p className="muted" style={{ margin: 0 }}>출력 기록이 없습니다.</p>
                      ) : caseLogs.map((log) => (
                        <div key={log.id} className="card" style={{ padding: 10 }}>
                          <div><strong>{log.type}</strong></div>
                          <div className="muted">출력자: {log.printedBy}</div>
                          <div className="muted">일시: {log.printedAt.replace('T', ' ').slice(0, 16)}</div>
                          {log.note && <div className="muted">메모: {log.note}</div>}
                        </div>
                      ))}
                    </div>
                  </Modal>

                  <Modal title="동선 기록" triggerLabel="동선 확인" triggerClassName="btn btn-link btn-muted">
                    <ul className="stack" style={{ minWidth: 360, margin: 0, paddingInlineStart: 20 }}>
                      {caseMovement.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </Modal>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
