import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketContext";
import { useAuth } from "../../context/AuthContext";
import axiosClient from "../../lib/axiosClient";

const ChatIcon = () => {
  const navigate = useNavigate();
  const { unreadMessagesCount: contextUnreadCount } = useSocket();
  const { user, isAuthenticated } = useAuth();
  const [localUnreadCount, setLocalUnreadCount] = useState(0);

  const unreadMessagesCount = contextUnreadCount || localUnreadCount;

  useEffect(() => {
    const fetchUnreadCount = async () => {
      if (isAuthenticated && user?._id) {
        try {
          const response = await axiosClient.get(
            `/chat/unread-count/${user._id}`
          );

          if (response.data.success) {
            setLocalUnreadCount(response.data.totalUnread);
          }
        } catch (error) {
          console.error("Error fetching unread messages count:", error);
        }
      }
    };

    if (!contextUnreadCount && isAuthenticated && user?._id) {
      fetchUnreadCount();
    }
  }, [isAuthenticated, user, contextUnreadCount]);

  return (
    <div
      className="relative cursor-pointer mr-3"
      onClick={() => navigate("/chat")}
    >
      <img
        src="/iconChat.png"
        className="w-6 h-6 hover:opacity-80"
        alt="Chat"
      />

      {unreadMessagesCount > 0 && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-[15px] h-[15px] flex items-center justify-center px-1">
          {unreadMessagesCount > 9 ? "9+" : unreadMessagesCount}
        </div>
      )}
    </div>
  );
};

export default ChatIcon;
