import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FiAlertTriangle } from "react-icons/fi";
import "./ConfirmModal.css";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  taskName: string;
  onCancel: () => void;
  onConfirm: () => void;
}

function ConfirmDeleteModal({
  isOpen,
  taskName,
  onCancel,
  onConfirm,
}: ConfirmDeleteModalProps) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    cancelButtonRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onCancel();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="confirm-modal__backdrop"
      onClick={onCancel}
      role="presentation"
    >
      <div
        className="confirm-modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="confirm-modal__icon">
          <FiAlertTriangle aria-hidden="true" />
        </div>

        <h2 id="confirm-modal-title" className="confirm-modal__title">
          Delete &lsquo;{taskName}&rsquo;?
        </h2>
        <p className="confirm-modal__subtitle">
          This action can&rsquo;t be undone.
        </p>

        <div className="confirm-modal__actions">
          <button
            type="button"
            ref={cancelButtonRef}
            className="confirm-modal__btn confirm-modal__btn--cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="confirm-modal__btn confirm-modal__btn--delete"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default ConfirmDeleteModal;
