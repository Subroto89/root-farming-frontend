import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import {useAuth} from './useAuth';

// Use a different namespace than chat to avoid conflicts
const TASK_SERVER_URL = import.meta.env.VITE_TASK_API_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const useTaskNotifications = () => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const { user, getToken } = useAuth();

  useEffect(() => {
    if (!user?.uid || !user?.role) return;

    const connectSocket = async () => {
      try {
        const token = await getToken();
        const newSocket = io(TASK_SERVER_URL, {
      auth: {
        token,
        userId: user.uid,
        role: user.role
      },
      path: '/task-socket' // Use different path than chat socket
    });

    // Handle connection
    newSocket.on('connect', () => {
      console.log('Connected to notification service');
      // Join user-specific room
      newSocket.emit('join', { userId: user.uid });
    });

    // Listen for new task notifications
    newSocket.on('taskNotification', (notification) => {
      setNotifications(prev => [...prev, notification]);
    });

    // Listen for task updates
    newSocket.on('taskUpdate', ({ taskId, update }) => {
      setNotifications(prev => 
        prev.map(notif => 
          notif.taskId === taskId 
            ? { ...notif, ...update }
            : notif
        )
      );
    });

        setSocket(newSocket);
      } catch (error) {
        console.error('Failed to connect to task notification service:', error);
      }
    };

    connectSocket();

    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    };
  }, [user?.uid, user?.role, getToken, socket]);

  // Mark notification as read
  const markAsRead = (notificationId) => {
    if (!socket) return;

    socket.emit('markNotificationRead', { notificationId });
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId
          ? { ...notif, read: true }
          : notif
      )
    );
  };

  // Clear notification
  const clearNotification = (notificationId) => {
    if (!socket) return;

    socket.emit('clearNotification', { notificationId });
    setNotifications(prev =>
      prev.filter(notif => notif.id !== notificationId)
    );
  };

  // Get unread count
  const getUnreadCount = () => {
    return notifications.filter(n => !n.read).length;
  };

  return {
    notifications,
    markAsRead,
    clearNotification,
    getUnreadCount,
    isConnected: !!socket?.connected
  };
};

export default useTaskNotifications;