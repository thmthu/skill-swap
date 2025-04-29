import mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema(
  {
    chat_room_id: {
      type: String,
      required: true,
      unique: true,
    },
    participants: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },
    latest_message: {
      type: String,
      default: "",
    },
    unreadCount: {
      type: Map,
      of: Number,
      default: {},
    },
  },
  { timestamps: true }
);

const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);
export default ChatRoom;
