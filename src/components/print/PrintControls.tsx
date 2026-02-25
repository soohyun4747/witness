'use client';

import { useEffect } from 'react';

export default function PrintControls({ onMarkPrinted }: { onMarkPrinted?: () => void }) {
  useEffect(() => { window.print(); }, []);
  return (
    <div className="no-print flex gap-2 mb-4">
      <button className="btn" onClick={() => window.print()}>인쇄</button>
      {onMarkPrinted && <button className="btn" onClick={onMarkPrinted}>인쇄 완료</button>}
      <button className="btn" onClick={() => window.close()}>닫기</button>
    </div>
  );
}
