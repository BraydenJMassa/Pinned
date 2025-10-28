import { createContext, ReactNode, useCallback, useState } from "react";
import PinModal from "../components/PinModal";

type ModalOptions = {
  onConfirm: (desc: string) => void;
  onCancel?: () => void;
  initialDesc?: string;
  title: string;
};

type PinModalContextType = {
  showModal: boolean;
  openPinModal: (options: ModalOptions) => void;
  closePinModal: () => void;
};

const PinModalContext = createContext<PinModalContextType | undefined>(
  undefined
);

export const PinModalProvider = ({ children }: { children: ReactNode }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalOptions, setModalOptions] = useState<ModalOptions | null>(null);

  const openModal = useCallback((options: ModalOptions) => {
    setModalOptions(options);
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleConfirm = (desc: string) => {
    modalOptions?.onConfirm(desc);
    closeModal();
  };

  const handleCancel = () => {
    modalOptions?.onCancel?.();
    closeModal();
  };

  return (
    <PinModalContext.Provider
      value={{
        showModal,
        openPinModal: openModal,
        closePinModal: closeModal,
      }}
    >
      {children}
      {showModal && modalOptions && (
        <PinModal
          initialDesc={modalOptions.initialDesc || ""}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          title={modalOptions.title}
        />
      )}
    </PinModalContext.Provider>
  );
};

export default PinModalContext;
