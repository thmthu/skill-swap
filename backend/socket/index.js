import Message from "../models/Message.js";
import ChatRoom from "../models/ChatRoom.js";
import { convertToObjectId } from "../utils/mongo.js";
import User from "../models/User.js";
const initSocket = (io) => {
  const userSocketMap = new Map();

  io.on("connection", (socket) => {
    socket.on("login", (userId) => {
      console.log("User logged in:", userId);
      userSocketMap.set(userId, socket.id);
      socket.join(`user_${userId}`);
    });

    socket.on("joinRoom", (chatRoomId) => {
      console.log("User joinRoom:", socket.id);
      socket.join(chatRoomId);
    });

    socket.on(
      "sendMessage",
      async ({ sender, chatRoomId, senderId, receiverId, text }) => {
        try {
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
          }
          io.to(chatRoomId).emit("newMessage", message);

          const receiverSocketId = userSocketMap.get(receiverId);

          if (receiverSocketId) {
            const receiverSocket = io.sockets.sockets.get(receiverSocketId);

            if (receiverSocket) {
              const isInRoom = receiverSocket.rooms.has(chatRoomId);

              if (!isInRoom) {
                io.to(`user_${receiverId}`).emit("messageNotification", {
                  message: text,
                  chatRoomId: chatRoomId,
                  sender: {
                    id: senderId,
                    name: sender.name || sender.username,
                    avatar: sender.profilePic || "./NAB.png",
                  },
                });

                io.to(`user_${receiverId}`).emit("updateUnreadCount", {
                  type: "increment",
                });
              }
            }
          }
          await room.save();
        } catch (e) {
          console.log("error at send message socket: ", e);
        }
      }
    );

    socket.on("markAsRead", async ({ chatRoomId, userId }) => {
      const room = await ChatRoom.findOne({ chat_room_id: chatRoomId });
      if (room) {
        const unreadCount = room.unreadCount.get(userId) || 0;
        room.unreadCount.set(userId, 0);
        await room.save();

        if (unreadCount > 0) {
          io.to(`user_${userId}`).emit("updateUnreadCount", {
            type: "decrement",
            count: unreadCount,
          });
        }
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      for (const [userId, socketId] of userSocketMap.entries()) {
        if (socketId === socket.id) {
          userSocketMap.delete(userId);
          break;
        }
      }
    });
  });
};

export default initSocket;
