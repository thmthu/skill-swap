import { useEffect, useState } from "react";
import ChatSidebar from "../../../components/Chat/ChatSidebar";
import ChatContent from "../../../components/Chat/ChatContent";
import axios from "axios";
const userId = "6805e59935e3fe0a7c60c001";
const Chat = () => {
  const [selectedChat, setSelectedChat] = useState("null");
  const [recentChats, setRecentChats] = useState([]);
  useEffect(() => {
    const fetchChatRoom = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/chat/chat-get-room/${userId}`
        );
        console.log("==========", res.data.data.chatRoom);
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
    <div className="mr-10 pr-10 flex h-screen w-screen bg-bg-light">
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
