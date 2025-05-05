import ChatRoom from "../models/ChatRoom.js";
import User from "../models/User.js";
import { convertToObjectId } from "../utils/mongo.js";
import moment from "moment";

export const getChatRooms = async (req, res) => {
  try {
    const userId = convertToObjectId(req.params.userId);
    const chatRoom = await User.findOne({ _id: userId });
    const arrayChatRoom = chatRoom.chat_room_id;
    if (arrayChatRoom.length == 0) {
      return res.status(200).json({
        data: {
          chatRoom: [],
        },
      });
    }
    const chatRoomFromUser = await ChatRoom.find({
      chat_room_id: { $in: arrayChatRoom },
    })
      .populate("participants", "fullName profilePic")
      .sort({ updatedAt: -1 });

    const formatChatRoom = await Promise.all(
      chatRoomFromUser.map(async (room) => {
        let otherUser = room.participants.find(
          (p) => p._id.toString() !== userId.toString()
        );
        if (otherUser) {
          otherUser = await User.findById(convertToObjectId(otherUser._id));
        }
        const unreadCountForUser = room.unreadCount.get(userId.toString()) || 0;

        return {
          chatRoomId: room.chat_room_id,
          latestMessage: room.latest_message,
          time: moment(room.updatedAt).format("DD/MM/YYYY"),
          unreadCount: unreadCountForUser,
          user: {
            _id: otherUser?._id.toString(),
            username: otherUser?.username,
            profilePic: otherUser?.avatar,
          },
        };
      })
    );
    return res.status(200).json({
      data: {
        chatRoom: formatChatRoom,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getUnreadMessagesCount = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(convertToObjectId(userId));
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    
    const arrayChatRoomIds = user.chat_room_id;
    
    if (arrayChatRoomIds.length === 0) {
      return res.status(200).json({
        success: true,
        totalUnread: 0
      });
    }
    
    const chatRooms = await ChatRoom.find({
      chat_room_id: { $in: arrayChatRoomIds }
    });
    
    let totalUnread = 0;
    
    chatRooms.forEach(room => {
      const unreadCountForUser = room.unreadCount.get(userId) || 0;
      totalUnread += unreadCountForUser;
    });
    
    return res.status(200).json({
      success: true,
      totalUnread
    });
    
  } catch (error) {
    console.error("Error getting unread messages count:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get unread messages count",
      error: error.message
    });
  }
};