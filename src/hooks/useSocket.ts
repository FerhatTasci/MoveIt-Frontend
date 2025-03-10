import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000"; // Assure-toi que ton backend tourne sur ce port

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    // 1. Initialiser la connexion Socket.io
    const newSocket = io(SOCKET_URL, {
      transports: ["websocket", "polling"], // Laisse polling si websocket échoue
    });

    // 2. Enregistrer les écouteurs
    newSocket.on("connect", () => {
      console.log("✅ Connecté au WebSocket : ", newSocket.id);
    });

    newSocket.on("connect_error", (err) => {
      console.log("❌ connect_error : ", err);
    });

    newSocket.on("disconnect", (reason) => {
      console.log("❌ Déconnecté du WebSocket :", reason);
    });

    // Écouter un événement custom, par exemple "receiveNotification"
    newSocket.on("receiveNotification", (notif) => {
      console.log("🔔 Notification reçue :", notif);
      setNotifications((prev) => [notif, ...prev]);
    });

    // 3. Nettoyage à la fin
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
      console.log("❌ Déconnecté du WebSocket");
    };
  }, []);

  return { socket, notifications };
};

export default useSocket;