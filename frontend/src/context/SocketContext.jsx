// src/context/SocketContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user?._id) {
      const socketInstance = io("http://localhost:3000");
      setSocket(socketInstance);
      socketInstance.emit("login", user._id);

      socketInstance.on(
        "messageNotification",
        ({ message, chatRoomId, sender }) => {
          console.log("Received message notification:", message);

          if (message.sender_id !== user._id) {
            toast.custom(
              (t) => (
                <div
                  className={`max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex mb-3 cursor-pointer`}
                  onClick={() => {
                    navigate("/chat", {
                      state: { selectedChatId: chatRoomId },
                    });
                    toast.dismiss(t.id);
                  }}
                >
                  <div className="flex-1 p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-0.5">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={sender.avatar || "/default-avatar.png"}
                          alt=""
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {sender.name}
                        </p>
                        <p className="mt-1 text-sm text-gray-500 truncate max-w-[250px]">
                          {message}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex border-l border-gray-200">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toast.dismiss(t.id);
                      }}
                      className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ),
              {
                duration: 5000,
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
