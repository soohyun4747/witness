'use client';

import { PropsWithChildren, useState } from 'react';

type ModalProps = PropsWithChildren<{
  title: string;
  triggerLabel: string;
  triggerClassName?: string;
}>;

export default function Modal({ title, triggerLabel, triggerClassName = 'btn', children }: ModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className={triggerClassName} onClick={() => setOpen(true)}>
        {triggerLabel}
      </button>
      {open && (
        <div className="modal-backdrop" onClick={() => setOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ margin: 0 }}>{title}</h3>
              <button type="button" className="btn btn-muted" onClick={() => setOpen(false)}>닫기</button>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
