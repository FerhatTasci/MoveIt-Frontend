import React from "react";
import NotificationList from "./components/NotificationList";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-4">MoveIt - Notifications</h1>
      <NotificationList />
    </div>
  );
}

export default App;
