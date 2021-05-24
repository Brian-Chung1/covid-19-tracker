import React, { useState, createContext, useContext } from 'react';
import Notification from '../components/Notification';

export const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = () => {
  const [notification, setNotification] = useState({
    open: false,
    message: '',
  });

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      <Notification notification={notification} />
    </NotificationContext.Provider>
  );
};
