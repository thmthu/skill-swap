import Message from "../models/Message.js";
import ChatRoom from "../models/ChatRoom.js";
import { convertToObjectId } from "../utils/mongo.js";
import User from "../models/User.js";
const initSocket = (io) => {
  io.on("connection", (socket) => {
    socket.on("joinRoom", (chatRoomId) => {
      console.log("User joinRoom:", socket.id);
      socket.join(chatRoomId);
    });

    socket.on(
      "sendMessage",
      async ({ chatRoomId, senderId, receiverId, text }) => {
        try {
          console.log("recie: ", receiverId);
          let room = await ChatRoom.findOne({ chat_room_id: chatRoomId });
          const message = await Message.create({
            chat_room_id: chatRoomId,
            sender_id: senderId,
            receiver_id: receiverId,
            text,
          });
          if (!room) {
            room = await ChatRoom.create({
              chat_room_id: chatRoomId,
              participants: [
                convertToObjectId(senderId),
                convertToObjectId(receiverId),
              ],
              latest_message: text,
              unreadCount: { [receiverId]: 1 },
            });
            await User.updateOne(
              { _id: convertToObjectId(senderId) },
              { $push: { chat_room_id: chatRoomId } }
            );
            await User.updateOne(
              { _id: convertToObjectId(receiverId) },
              { $push: { chat_room_id: chatRoomId } }
            );
          } else {
            room.latest_message = text;
            if (!room.unreadCount.has(receiverId)) {
              room.unreadCount.set(receiverId, 1);
            } else {
              room.unreadCount.set(
                receiverId,
                room.unreadCount.get(receiverId) + 1
              );
            }
            await room.save();
          }
          io.to(chatRoomId).emit("newMessage", message);
        } catch (e) {
          console.log("error at send message socket: ", e);
        }
      }
    );

    socket.on("markAsRead", async ({ chatRoomId, userId }) => {
      const room = await ChatRoom.findOne({ chat_room_id: chatRoomId });
      if (room) {
        room.unreadCount.set(userId, 0);
        await room.save();
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

export default initSocket;
