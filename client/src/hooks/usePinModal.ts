import { useContext } from "react";
import PinModalContext from "../context/PinModalProvider";

export const usePinModal = () => {
  const context = useContext(PinModalContext);
  if (!context) {
    throw new Error("usePinModal must be used within an PinModalProvider");
  }
  return context;
};
