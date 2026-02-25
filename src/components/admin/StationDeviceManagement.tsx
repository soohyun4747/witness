'use client';

import Modal from '@/components/ui/Modal';

interface StationItem {
  id: string;
  name: string;
  description?: string;
}

interface DeviceItem {
  id: string;
  name: string;
  deviceCode: string;
  assignedStationId?: string;
}

export default function StationDeviceManagement({
  stations,
  devices,
  saveStation,
  saveDevice,
  deleteStation,
  deleteDevice,
}: {
  stations: StationItem[];
  devices: DeviceItem[];
  saveStation: (formData: FormData) => void;
  saveDevice: (formData: FormData) => void;
  deleteStation: (formData: FormData) => void;
  deleteDevice: (formData: FormData) => void;
}) {
  return (
    <>
      <div className="row">
        <Modal title="구역 추가" triggerLabel="구역 추가">
          <form action={saveStation} className="stack" style={{ minWidth: 320 }}>
            <div className="field"><label className="field-label" htmlFor="stationName">구역 이름</label><input id="stationName" className="input" name="name" required /></div>
            <div className="field"><label className="field-label" htmlFor="stationDesc">설명</label><textarea id="stationDesc" className="textarea" name="description" /></div>
            <button className="btn">저장</button>
          </form>
        </Modal>

        <Modal title="디바이스 추가" triggerLabel="디바이스 추가">
          <form action={saveDevice} className="stack" style={{ minWidth: 320 }}>
            <div className="field"><label className="field-label" htmlFor="deviceName">디바이스 이름</label><input id="deviceName" className="input" name="name" required /></div>
            <div className="field"><label className="field-label" htmlFor="deviceCode">디바이스 코드</label><input id="deviceCode" className="input" name="deviceCode" required /></div>
            <div className="field"><label className="field-label" htmlFor="assignedStationId">배정 구역</label><select id="assignedStationId" className="select" name="assignedStationId"><option value="">미지정</option>{stations.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select></div>
            <button className="btn">저장</button>
          </form>
        </Modal>
      </div>

      <div className="panel-grid">
        <div className="card stack">
          <h2 style={{ margin: 0 }}>구역 목록</h2>
          {stations.length === 0 ? (
            <div className="table-empty">등록된 구역이 없습니다.</div>
          ) : (
            <table>
              <thead><tr><th>이름</th><th>설명</th><th>작업</th></tr></thead>
              <tbody>
                {stations.map((s) => (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td>{s.description || '-'}</td>
                    <td>
                      <div className="actions-cell">
                        <Modal title="구역 수정" triggerLabel="수정" triggerClassName="btn btn-link">
                          <form action={saveStation} className="stack" style={{ minWidth: 320 }}>
                            <input type="hidden" name="id" value={s.id} />
                            <div className="field"><label className="field-label" htmlFor={`stationName-${s.id}`}>구역 이름</label><input id={`stationName-${s.id}`} className="input" name="name" defaultValue={s.name} required /></div>
                            <div className="field"><label className="field-label" htmlFor={`stationDesc-${s.id}`}>설명</label><textarea id={`stationDesc-${s.id}`} className="textarea" name="description" defaultValue={s.description || ''} /></div>
                            <button className="btn">저장</button>
                          </form>
                        </Modal>
                        <form action={deleteStation}>
                          <input type="hidden" name="id" value={s.id} />
                          <button className="btn btn-muted" type="submit">삭제</button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="card stack">
          <h2 style={{ margin: 0 }}>디바이스 목록</h2>
          {devices.length === 0 ? (
            <div className="table-empty">등록된 디바이스가 없습니다.</div>
          ) : (
            <table>
              <thead><tr><th>이름</th><th>코드</th><th>구역</th><th>작업</th></tr></thead>
              <tbody>
                {devices.map((d) => (
                  <tr key={d.id}>
                    <td>{d.name}</td>
                    <td>{d.deviceCode}</td>
                    <td>{stations.find((s) => s.id === d.assignedStationId)?.name || '미지정'}</td>
                    <td>
                      <div className="actions-cell">
                        <Modal title="디바이스 수정" triggerLabel="수정" triggerClassName="btn btn-link">
                          <form action={saveDevice} className="stack" style={{ minWidth: 320 }}>
                            <input type="hidden" name="id" value={d.id} />
                            <div className="field"><label className="field-label" htmlFor={`deviceName-${d.id}`}>디바이스 이름</label><input id={`deviceName-${d.id}`} className="input" name="name" defaultValue={d.name} required /></div>
                            <div className="field"><label className="field-label" htmlFor={`deviceCode-${d.id}`}>디바이스 코드</label><input id={`deviceCode-${d.id}`} className="input" name="deviceCode" defaultValue={d.deviceCode} required /></div>
                            <div className="field"><label className="field-label" htmlFor={`assignedStation-${d.id}`}>배정 구역</label><select id={`assignedStation-${d.id}`} className="select" name="assignedStationId" defaultValue={d.assignedStationId || ''}><option value="">미지정</option>{stations.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select></div>
                            <button className="btn">저장</button>
                          </form>
                        </Modal>
                        <form action={deleteDevice}>
                          <input type="hidden" name="id" value={d.id} />
                          <button className="btn btn-muted" type="submit">삭제</button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
