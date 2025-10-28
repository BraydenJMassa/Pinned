import editIcon from "../assets/edit.png";
import checkedCheckbox from "../assets/checked-checkbox.png";
import uncheckedCheckbox from "../assets/unchecked-checkbox.png";
import deleteIcon from "../assets/delete.png";
import "../styles/pin.css";
import "../styles/dashboard.css";
import { useState } from "react";
import { useConfirmationModal } from "../hooks/useConfirmationModal";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { usePinModal } from "../hooks/usePinModal";
import { PinType } from "../types/PinType";

type PinProps = {
  pin: PinType;
  onUpdate: () => void;
};

const Pin = ({ pin, onUpdate }: PinProps) => {
  const { auth } = useAuth();
  const { openConfirmationModal } = useConfirmationModal();
  const { openPinModal } = usePinModal();
  const [isChecked, setIsChecked] = useState(pin.completed);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickDelete = () => {
    openConfirmationModal({
      title: "Are you sure you want to delete this Pin?",
      onConfirm: deletePin,
    });
  };
  const deletePin = async () => {
    await axios.delete(`/api/pin/${pin.pinId}`, {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    onUpdate();
  };

  const handleClickEdit = () => {
    openPinModal({
      title: "Edit pin",
      initialDesc: pin.description,
      onConfirm: updatePin,
    });
  };
  const updatePin = async (desc: string) => {
    try {
      await axios.put(
        `/api/pin/${pin.pinId}`,
        { description: desc },
        { headers: { Authorization: `Bearer ${auth.accessToken}` } }
      );
      onUpdate();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(
          "Error updating pin:",
          err.response?.data?.error || err.message
        );
      } else {
        console.error("Unexpected error:", err);
      }
    }
  };
  const handleClickCheckbox = async () => {
    const updatedChecked = !isChecked;
    setIsChecked(updatedChecked);
    setIsLoading(true);
    try {
      await axios.patch(
        `/api/pin/togglecompleted/${pin.pinId}`,
        { pin },
        { headers: { Authorization: `Bearer ${auth.accessToken}` } }
      );
      onUpdate();
    } catch (err) {
      console.error("Error updating pin: ", err);
      setIsChecked(!updatedChecked);
    } finally {
      setIsLoading(false);
    }
  };
  const checkBoxImg = isChecked ? checkedCheckbox : uncheckedCheckbox;
  return (
    <div className={isChecked ? "pin completed" : "pin"}>
      <div className="pin-desc">{pin.description}</div>
      <div className="pin-btns">
        <img
          src={deleteIcon}
          className="pin-btn"
          alt="Delete"
          onClick={handleClickDelete}
        />
        <img
          src={editIcon}
          className="pin-btn"
          alt="Edit"
          onClick={handleClickEdit}
        />
        <img
          src={checkBoxImg}
          className="pin-btn"
          alt="checked"
          onClick={!isLoading ? handleClickCheckbox : undefined}
        />
      </div>
    </div>
  );
};

export default Pin;
