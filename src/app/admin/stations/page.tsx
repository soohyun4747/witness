import Link from 'next/link';
import { saveDevice, saveStation } from '@/app/admin/actions';
import StationDeviceModals from '@/components/admin/StationDeviceModals';
import { requireSession } from '@/lib/auth';
import { repo } from '@/lib/store';

export default async function StationsPage() {
  await requireSession(['ADMIN']);
  const db = repo.getDb();

  return (
    <div className="stack">
      <div className="page-header">
        <h1 className="page-title">구역 · 디바이스 관리</h1>
        <StationDeviceModals saveStation={saveStation} saveDevice={saveDevice} stations={db.stations.map((s) => ({ id: s.id, name: s.name }))} />
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
