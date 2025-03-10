import React from "react";
import useSocket from "../hooks/useSocket";

const NotificationList: React.FC = () => {
  const { notifications } = useSocket();

  return (
    <div className="bg-white shadow p-4 w-full max-w-md mx-auto">
      <h2 className="text-xl mb-3 font-bold">🔔 Notifications</h2>
      {notifications.length === 0 ? (
        <p>Aucune notification reçue.</p>
      ) : (
        notifications.map((notif, index) => (
          <div key={index} className="border-b border-gray-200 py-2">
            <p className="text-gray-800">{notif.message}</p>
            <small className="text-gray-500">{new Date(notif.timestamp).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationList;
