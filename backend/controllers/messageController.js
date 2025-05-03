import Message from "../models/Message.js";
export const getMessages = async (req, res) => {
  try {
    const chatRoomId = req.params.chatRoomId;
    console.log(chatRoomId);

    const messages = await Message.find({ chat_room_id: chatRoomId }).sort({
      createdAt: 1,
    });
    if (messages.length === 0)
      return res.status(200).json({
        data: {
          messages: [],
        },
      });
    res.status(200).json({
      data: {
        messages,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
