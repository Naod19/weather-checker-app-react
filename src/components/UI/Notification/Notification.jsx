import { useEffect } from "react";
import "./Notification.css";

export default function Notification({ message, onDismiss }) {
  useEffect(() => {
    let timer;
    if (message) {
      timer = setTimeout(onDismiss, 2500);
    }
    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  if (!message) return null;
  return <div className="notification-banner">{message}</div>;
}
