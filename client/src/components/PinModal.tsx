import { useEffect, useState } from "react";
import "../styles/Modal.css";
import EditPinTextarea from "./EditPinTextarea";

type PinModalProps = {
  onConfirm: (desc: string) => void;
  onCancel?: () => void;
  title: string;
  initialDesc: string;
};

const PinModal = ({
  title,
  initialDesc,
  onConfirm,
  onCancel,
}: PinModalProps) => {
  const [desc, setDesc] = useState(initialDesc);

  const handleSubmit = () => {
    if (desc.trim() === "" && onCancel) {
      onCancel();
    }
    onConfirm(desc);
  };

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
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onCancel, desc]);

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal pin-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-x-btn" onClick={onCancel}>
          x
        </button>
        <h1 className="modal-title">{title}</h1>
        <EditPinTextarea desc={desc} setDesc={setDesc} />
        <div className="modal-btns pin-modal-btns">
          <button className="modal-btn green-btn" onClick={handleSubmit}>
            Submit
          </button>
          <button className="modal-btn red-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PinModal;
