import { deleteDevice, deleteStation, saveDevice, saveStation } from '@/app/admin/actions';
import StationDeviceManagement from '@/components/admin/StationDeviceManagement';
import { requireSession } from '@/lib/auth';
import { repo } from '@/lib/store';

export default async function StationsPage() {
  await requireSession(['ADMIN']);
  const db = repo.getDb();

  return (
    <div className="stack">
      <div className="page-header">
        <h1 className="page-title">구역 · 디바이스 관리</h1>
      </div>

      <StationDeviceManagement
        stations={db.stations}
        devices={db.devices}
        saveStation={saveStation}
        saveDevice={saveDevice}
        deleteStation={deleteStation}
        deleteDevice={deleteDevice}
      />
    </div>
  );
}
