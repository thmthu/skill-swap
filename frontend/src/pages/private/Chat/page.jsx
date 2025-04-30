import { useContext, useEffect, useState } from "react";
import ChatSidebar from "../../../components/Chat/ChatSidebar";
import ChatContent from "../../../components/Chat/ChatContent";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
//const userId = "6805e59935e3fe0a7c60c001";
const Chat = () => {
  const userId = useAuth().user._id;
  const [selectedChat, setSelectedChat] = useState("null");
  const [recentChats, setRecentChats] = useState([]);
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
    <div className="flex w-4/5 h-[calc(100vh-136px)] mx-auto my-2 bg-bg-light shadow-lg rounded-lg overflow-hidden">
      <ChatSidebar
        chats={recentChats}
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
      />
      <ChatContent selectedChatId={selectedChat} />
    </div>
  );
};

export default Chat;
