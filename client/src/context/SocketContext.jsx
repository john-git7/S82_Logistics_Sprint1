import React, { createContext, useContext, useState, useCallback } from 'react';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [isConnected] = useState(false); // Demo mode - no real connection
  const [activeAlerts, setActiveAlerts] = useState([]);

  const clearAlert = useCallback((id) => {
    setActiveAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  const clearAllAlerts = useCallback(() => {
    setActiveAlerts([]);
  }, []);

  // Mock socket for frontend-only demo
  const socket = {
    emit: () => {},
    on: () => {},
    off: () => {},
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        activeAlerts,
        clearAlert,
        clearAllAlerts,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export default SocketContext;
