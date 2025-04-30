import { Send, MessageSquare } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
const socket = io("http://localhost:3000");
const ChatContent = ({ userFromHome, setRecentChats, chatRoomId }) => {
  const senderId = useAuth().user._id;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messageContainerRef = useRef(null);
  const [receiverId, setReceiverId] = useState("");
  useEffect(() => {
    socket.emit("joinRoom", chatRoomId);
    const ids = chatRoomId.split("_");
    setReceiverId(ids.find((id) => id !== senderId));
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/chat/chat-get-message/${chatRoomId}` 
        );
        console.log("data:", res.data);
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
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
    socket.on("newMessage", (newMsg) => {
      setMessages((prevMessages) => [...prevMessages, newMsg]);
      setTimeout(() => {
        if (messageContainerRef.current) {
          messageContainerRef.current.scrollTop =
            messageContainerRef.current.scrollHeight;
        }
      }, 50);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [chatRoomId]);

  const appendMessage = (newMsg) => {
    if (messageContainerRef.current) {
      const msgDiv = document.createElement("div");
      msgDiv.className = `flex ${
        newMsg.sender_id === senderId ? "justify-end" : "justify-start"
      }`;

      msgDiv.innerHTML = `
        <div class="max-w-[70%] rounded-lg p-3 ${
          newMsg.sender_id === senderId
            ? "bg-black text-white"
            : "bg-white text-text-light"
        }">
          <p class="text-body1">${newMsg.text}</p>
          <span class="text-body2 mt-1 block opacity-75">
            ${new Date(newMsg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      `;

      messageContainerRef.current.appendChild(msgDiv);
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      socket.emit("sendMessage", {
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
      <div className=" h-full overflow-y-auto flex-1 flex items-center justify-center bg-bg-light">
        <div className="text-center">
          <MessageSquare className="w-16 h-16 text-primary-medium mx-auto mb-4" />
          <h2 className="text-h2 font-heading font-bold text-primary-dark">
            Select a conversation
          </h2>
          <p className="text-body1 secondary-light-pink mt-2">
            Choose a chat from the sidebar to start messaging
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex-1 flex flex-col h-full bg-bg-light">
      {/* Chat Header */}
      <div className="p-4 bg-white border-b border-primary-extra-light">
        <h2 className="text-h3 font-heading font-bold text-primary-dark">
          Chat Title
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
                  : "bg-white text-text-light"
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
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-body1 text-gray-400">
              No messages yet. Start a conversation!
            </p>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="p-4 bg-white border-t border-primary-extra-light">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 rounded-lg border border-primary-extra-light focus:outline-none focus:border-primary-medium text-body1"
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
