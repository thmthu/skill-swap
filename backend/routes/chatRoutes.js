import { Router } from "express";
import {
  getChatRooms,
  getUnreadMessagesCount,
} from "../controllers/chatController.js";
import { getMessages } from "../controllers/messageController.js";

export const router = Router();

router.get("/chat-get-room/:userId", getChatRooms);
router.get("/chat-get-message/:chatRoomId", getMessages);
router.get("/unread-count/:userId", getUnreadMessagesCount);
