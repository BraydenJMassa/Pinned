import { useEffect, useState } from "react";
import { PinType } from "../types/PinType";
import "../styles/dashboard.css";
import Navbar from "../components/Navbar";
import { usePinModal } from "../hooks/usePinModal";
import PinList from "../components/PinList";
import PinOperations from "../utils/PinOperations";

const Dashboard = () => {
  const [pins, setPins] = useState<undefined | PinType[]>(undefined);
  const [pinsError, setPinsError] = useState<undefined | string>(undefined);
  const { openPinModal } = usePinModal();

  const { fetchPins, createPin } = PinOperations(setPins, setPinsError);

  const handleClickAddPin = () => {
    openPinModal({
      title: "Add Pin",
      initialDesc: "",
      onConfirm: createPin,
    });
  };

  useEffect(() => {
    fetchPins();
  }, []);

  if (pinsError) {
    return <div className="dashboard pinsError">{pinsError}</div>;
  }
  if (!pins) {
    return (
      <div className="loading-container">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Navbar />
      <main>
        <button className="create-pin-btn" onClick={handleClickAddPin}>
          +
        </button>
        <PinList pins={pins} onUpdate={fetchPins} />
      </main>
    </div>
  );
};

export default Dashboard;
