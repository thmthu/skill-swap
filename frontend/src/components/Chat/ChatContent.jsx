import { Send, MessageSquare } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axiosClient from "../../lib/axiosClient";
import { useSocket } from "../../context/SocketContext";
const ChatContent = ({ userFromHome, setRecentChats, chatRoomId }) => {
  const senderId = useAuth().user._id;
  const sender = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messageContainerRef = useRef(null);
  const [receiverId, setReceiverId] = useState("");
  const { socket, joinRoom, markAsRead, sendMessage, setUnreadMessagesCount } =
    useSocket();
  useEffect(() => {
    if (!chatRoomId || chatRoomId === "null" || !socket) return;

    joinRoom(chatRoomId);
    markAsRead(chatRoomId, senderId);
    setRecentChats((prevChats) => {
      const currentChat = prevChats.find(
        (chat) => chat.chatRoomId === chatRoomId
      );
      const unreadCount = currentChat?.unreadCount || 0;
      if (unreadCount > 0) {
        setUnreadMessagesCount((prev) => Math.max(0, prev - unreadCount));
      }

      return prevChats.map((chat) =>
        chat.chatRoomId === chatRoomId ? { ...chat, unreadCount: 0 } : chat
      );
    });
    const ids = chatRoomId.split("_");
    setReceiverId(ids.find((id) => id !== senderId));

    const fetchMessages = async () => {
      try {
        const res = await axiosClient.get(
          `/chat/chat-get-message/${chatRoomId}`
        );
        if (res.data.data.messages) {
          setMessages(res.data.data.messages);
        } else {
          setMessages([]);
        }
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };

    fetchMessages();
    const handleNewMessage = (newMsg) => {
      setMessages((prevMessages) => [...prevMessages, newMsg]);
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [chatRoomId, senderId, socket]);

  useEffect(() => {
    const scrollToBottom = () => {
      if (messageContainerRef.current) {
        messageContainerRef.current.scrollTop =
          messageContainerRef.current.scrollHeight;
      }
    };
    scrollToBottom();
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages]);

  const handleSend = () => {
    if (message.trim()) {
      sendMessage({
        sender: {
          name: sender.user.username,
          profilePic: sender.user.avatar || "./NAB.png",
        },
        chatRoomId,
        senderId,
        receiverId,
        text: message.trim(),
      });

      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      setMessage("");
      if (messages.length == 0) {
        const newChatRoom = {
          chatRoomId,
          latestMessage: message.trim(),
          time: formattedDate,
          unreadCount: 0,
          user: { ...userFromHome },
        };

        setRecentChats((prevChats) => {
          const exists = prevChats.some(
            (chat) => chat.chatRoomId === chatRoomId
          );
          if (exists) {
            return prevChats.map((chat) =>
              chat.chatRoomId === chatRoomId
                ? {
                    ...chat,
                    latestMessage: message.trim(),
                    time: formattedDate,
                  }
                : chat
            );
          } else {
            return [newChatRoom, ...prevChats];
          }
        });
      } else {
        setRecentChats((prevChats) => {
          const existingChatIndex = prevChats.findIndex(
            (chat) => chat.chatRoomId === chatRoomId
          );
          const updatedChats = [...prevChats];
          const [existingChat] = updatedChats.splice(existingChatIndex, 1);
          const updatedChat = {
            ...existingChat,
            latestMessage: message.trim(),
            time: formattedDate,
          };
          return [updatedChat, ...updatedChats];
        });
      }
    }
  };

  if (!chatRoomId || chatRoomId === "null") {
    return (
      <div className="h-full overflow-y-auto flex-1 flex items-center justify-center bg-bg-light dark:bg-bg-dark">
        <div className="text-center">
          <MessageSquare className="w-16 h-16 text-primary-medium mx-auto mb-4" />
          <h2 className="text-h2 font-heading font-bold text-primary-dark dark:text-primary-light">
            Select a conversation
          </h2>
          <p className="text-body1 text-secondary dark:text-muted-foreground mt-2">
            Choose a chat from the sidebar to start messaging
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-bg-light dark:bg-bg-dark">
      {/* Header */}
      <div className="p-4 bg-white dark:bg-gray-800 border-b border-primary-extra-light dark:border-gray-700 flex items-center">
        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
          <img
            src={userFromHome.profilePic || "/NAB.png"}
            alt={`${userFromHome.username}'s avatar`}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-h3 font-heading font-bold text-primary-dark dark:text-white">
          {userFromHome.username}
        </h2>
      </div>

      {/* Messages */}
      <div
        ref={messageContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender_id === senderId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                msg.sender_id === senderId
                  ? "bg-black text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-text-light dark:text-white"
              }`}
            >
              <p className="text-body1">{msg.text}</p>
              <span className="text-body2 mt-1 block opacity-75">
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 bg-white dark:bg-gray-800 border-t border-primary-extra-light dark:border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-bg-light dark:bg-gray-700 text-black dark:text-white focus:outline-none"
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="p-2 rounded-lg bg-primary hover:bg-primary-dark"
          >
            <Send color="white" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatContent;
