import { useEffect, useState } from "react";
import Modal from "./Modal";

function Notification({ message, type = "success", duration = 3000, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose(); // Call optional callback when notification disappears
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={visible ? "d-block" : "d-none"}>
      <Modal>
        <div className={`notification ${type}`}>{message}</div>
      </Modal>
    </div>
  );
}

export default Notification;
