import React, { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((message, type = 'info', durationMs = 4000) => {
    const id = `notif-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    setNotifications(prev => [...prev, { id, message, type }]);

    if (durationMs > 0) {
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, durationMs);
    }
    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    return {
      notifications: [],
      addNotification: (msg) => console.log('Notification:', msg),
      removeNotification: () => {},
    };
  }
  return context;
}

