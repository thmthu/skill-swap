import { useState } from "react";
import ChatSidebar from "../../../components/Chat/ChatSidebar";
import ChatContent from "../../../components/Chat/ChatContent";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState("null");

  const recentChats = [
    {
      id: "1",
      name: "John Doe",
      lastMessage: "Hey, how are you?",
      time: "10:30 AM",
      unread: 2,
    },
    {
      id: "2",
      name: "Jane Smith",
      lastMessage: "The meeting is scheduled for tomorrow",
      time: "9:15 AM",
      unread: 0,
    },
    {
      id: "3",
      name: "Team Chat",
      lastMessage: "New project updates",
      time: "Yesterday",
      unread: 5,
    },
  ];

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
