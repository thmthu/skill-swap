// src/context/SocketContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ChatNotification from "../components/Chat/ChatNotification";
import { API_CONFIG } from "../lib/config";
const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user?._id) {
      const socketInstance = io(API_CONFIG.BASE_URL_SOCKET);
      setSocket(socketInstance);
      socketInstance.emit("login", user._id);

      socketInstance.on(
        "messageNotification",
        ({ message, chatRoomId, sender }) => {
          console.log("Received message notification:", message);

          if (message.sender_id !== user._id) {
            toast.custom(
              (t) => (
                <ChatNotification
                  toast={toast}
                  sender={sender}
                  message={message}
                  route={"/chat"}
                  chatRoomId={chatRoomId}
                />
              ),
              {
                duration: 1700,
                position: "bottom-right",
              }
            );

            playNotificationSound();
          }
        }
      );

      return () => {
        socketInstance.disconnect();
      };
    }
  }, [isAuthenticated, user, navigate]);

  const playNotificationSound = () => {
    try {
      const audio = new Audio("/mixkit-happy-bell-alert-601.wav");
      audio.play().catch((err) => console.error("Failed to play sound:", err));
    } catch (error) {
      console.error("Error playing notification sound:", error);
    }
  };

  const joinRoom = (chatRoomId) => {
    if (socket && chatRoomId) {
      socket.emit("joinRoom", chatRoomId);
    }
  };

  const sendMessage = (messageData) => {
    if (socket) {
      socket.emit("sendMessage", messageData);
    }
  };

  const markAsRead = (chatRoomId, userId) => {
    if (socket && chatRoomId && userId) {
      socket.emit("markAsRead", { chatRoomId, userId });
    }
  };

  return (
    <SocketContext.Provider
      value={{ socket, joinRoom, sendMessage, markAsRead }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
