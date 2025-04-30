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
            profilePic: otherUser?.profilePic,
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
