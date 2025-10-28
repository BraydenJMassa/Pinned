import { useEffect } from "react";
import "../styles/Modal.css";

type ConfirmationModalProps = {
  title: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmationModal = ({
  title,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onCancel) {
      onCancel();
    }
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onCancel) {
        onCancel();
      }
      if (e.key === "Enter") {
        e.preventDefault();
        onConfirm();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);
  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-x-btn" onClick={onCancel}>
          x
        </button>
        <h1 className="modal-title">{title}</h1>
        <div className="modal-btns">
          <button className="modal-btn green-btn" onClick={onConfirm}>
            Yes
          </button>
          <button className="modal-btn red-btn" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
