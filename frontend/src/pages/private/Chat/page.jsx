import { useContext, useEffect, useRef, useState } from "react";
import ChatSidebar from "../../../components/Chat/ChatSidebar";
import ChatContent from "../../../components/Chat/ChatContent";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import { useLocation } from "react-router-dom";
import axiosClient from "../../../lib/axiosClient";

const Chat = () => {
  const userId = useAuth().user._id;
  const [selectedChat, setSelectedChat] = useState("null");
  const [recentChats, setRecentChats] = useState([]);
  const location = useLocation();
  const receiverId = location.state?.receiverId;
  const [receiver, setReceiver] = useState({
    receiverId: "",
    username: "",
    profilePic: "",
  });
  const flag = useRef(false);
  useEffect(() => {
    const fetchChatRoom = async () => {
      try {
        const res = await axiosClient.get(`/chat/chat-get-room/${userId}`);
        if (res.data.data.chatRoom.length > 0) {
          setRecentChats(res.data.data.chatRoom);
        }
      } catch (e) {
        console.log("error at pages/chat : ", e);
      }
    };
    fetchChatRoom();
    if (location.state?.username && !flag.current) {
      console.log("hello");
      setReceiver({
        receiverId,
        username: location.state?.username,
        profilePic: location.state?.profilePic,
      });
      return;
    }
  }, []);
  // useEffect(() => {
  //   if (location.state?.username && !flag.current) {
  //     console.log("hello");
  //     setReceiver({
  //       receiverId,
  //       username: location.state?.username,
  //       profilePic: location.state?.profilePic,
  //     });
  //     return;
  //   } else if (selectedChat != "null") {
  //     const userFetch = recentChats.find((chat) => {
  //       return chat.chatRoomId == selectedChat;
  //     });
  //     setReceiver({
  //       receiverId,
  //       username: userFetch.user.username,
  //       profilePic: userFetch.user.profilePic || "./NAB.png",
  //     });
  //   }
  //   flag.current = true;
  // }, [recentChats, selectedChat]);
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

  return (
    <div className="flex w-full h-[calc(100vh-120px)] mx-auto  bg-bg-light shadow-lg rounded-lg overflow-hidden">
      <ChatSidebar
        chats={recentChats}
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
        setReceiver={setReceiver}
      />
      <ChatContent
        userFromHome={receiver}
        setRecentChats={setRecentChats}
        chatRoomId={selectedChat}
        chats={recentChats}
      />
    </div>
  );
};

export default Chat;
