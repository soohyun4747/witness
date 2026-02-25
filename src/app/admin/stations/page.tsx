import Link from 'next/link';
import { saveDevice, saveStation } from '@/app/admin/actions';
import { requireSession } from '@/lib/auth';
import { repo } from '@/lib/store';

export default async function StationsPage() {
  await requireSession(['ADMIN']);
  const db = repo.getDb();

  return (
    <div className="stack">
      <div className="page-header">
        <h1 className="page-title">구역 · 디바이스 관리</h1>
        <div className="row">
          <details className="popup">
            <summary>구역 추가</summary>
            <div className="popup-body">
              <form action={saveStation} className="stack" style={{ minWidth: 320 }}>
                <div className="field"><label className="field-label" htmlFor="stationName">구역 이름</label><input id="stationName" className="input" name="name" required /></div>
                <div className="field"><label className="field-label" htmlFor="stationDesc">설명</label><textarea id="stationDesc" className="textarea" name="description" /></div>
                <button className="btn">저장</button>
              </form>
            </div>
          </details>

          <details className="popup">
            <summary>디바이스 추가</summary>
            <div className="popup-body">
              <form action={saveDevice} className="stack" style={{ minWidth: 320 }}>
                <div className="field"><label className="field-label" htmlFor="deviceName">디바이스 이름</label><input id="deviceName" className="input" name="name" required /></div>
                <div className="field"><label className="field-label" htmlFor="deviceCode">디바이스 코드</label><input id="deviceCode" className="input" name="deviceCode" required /></div>
                <div className="field"><label className="field-label" htmlFor="assignedStationId">배정 구역</label><select id="assignedStationId" className="select" name="assignedStationId"><option value="">미지정</option>{db.stations.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select></div>
                <button className="btn">저장</button>
              </form>
            </div>
          </details>
        </div>
      </div>

      <div className="panel-grid">
        <div className="card stack">
          <h2 style={{ margin: 0 }}>구역 목록</h2>
          <table>
            <thead><tr><th>이름</th><th>설명</th><th /></tr></thead>
            <tbody>
              {db.stations.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.description || '-'}</td>
                  <td><Link className="btn btn-link" href={`/admin/stations/${s.id}`}>수정</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card stack">
          <h2 style={{ margin: 0 }}>디바이스 목록</h2>
          <table>
            <thead><tr><th>이름</th><th>코드</th><th>구역</th><th /></tr></thead>
            <tbody>
              {db.devices.map((d) => (
                <tr key={d.id}>
                  <td>{d.name}</td>
                  <td>{d.deviceCode}</td>
                  <td>{db.stations.find((s) => s.id === d.assignedStationId)?.name || '미지정'}</td>
                  <td><Link className="btn btn-link" href={`/admin/devices/${d.id}`}>수정</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
