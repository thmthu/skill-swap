import { useContext, useEffect, useState } from "react";
import ChatSidebar from "../../../components/Chat/ChatSidebar";
import ChatContent from "../../../components/Chat/ChatContent";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import { useLocation } from "react-router-dom";

const Chat = () => {
  const userId = useAuth().user._id;
  const [selectedChat, setSelectedChat] = useState("null");
  const [recentChats, setRecentChats] = useState([]);
  const location = useLocation();
  const receiverId = location.state?.receiverId;
  const userFromHome = {
    receiverId,
    username: location.state?.username,
    profilePic: location.state?.profilePic,
  };
  useEffect(() => {
    if (receiverId && userId) {
      const temp =
        receiverId > userId
          ? `${receiverId}_${userId}`
          : `${userId}_${receiverId}`;
      setSelectedChat(temp);
      const chatRoomExists = recentChats.some(
        (chat) => chat.chatRoomId === temp
      );
      if (!chatRoomExists) {
        console.log("Creating new chat room:", temp);
      }
    }
  }, [receiverId, userId]);

  useEffect(() => {
    const fetchChatRoom = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/chat/chat-get-room/${userId}`
        );
        if (res.data.data.chatRoom.length > 0) {
          setRecentChats(res.data.data.chatRoom);
        }
      } catch (e) {
        console.log("error at pages/chat : ", e);
      }
    };
    fetchChatRoom();
  }, []);
  return (
    <div className="flex w-full h-[calc(100vh-120px)] mx-auto  bg-bg-light shadow-lg rounded-lg overflow-hidden">
      <ChatSidebar
        chats={recentChats}
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
      />
      <ChatContent
        userFromHome={userFromHome}
        setRecentChats={setRecentChats}
        chatRoomId={selectedChat}
      />
    </div>
  );
};

export default Chat;
