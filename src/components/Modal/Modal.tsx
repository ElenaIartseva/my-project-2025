'use client';
import { useEffect, useRef } from 'react';
import type { ModalProps } from './Modal.props';
import classes from './Modal.module.scss';

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;

    const opener = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (opener instanceof HTMLElement) {
        opener.focus({ preventScroll: true });
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className={classes.overlay}
      aria-label="Модальное окно"
      aria-modal="true"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={classes.modal}>
        <button
          type="button"
          className={classes.closeButton}
          onClick={onClose}
          aria-label="Закрыть"
        >
          ×
        </button>
        {children}
      </div>
    </dialog>
  );
};
