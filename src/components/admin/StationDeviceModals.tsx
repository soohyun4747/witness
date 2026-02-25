'use client';

import Modal from '@/components/ui/Modal';

export default function StationDeviceModals({
  saveStation,
  saveDevice,
  stations,
}: {
  saveStation: (formData: FormData) => void;
  saveDevice: (formData: FormData) => void;
  stations: Array<{ id: string; name: string }>;
}) {
  return (
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
  );
}
