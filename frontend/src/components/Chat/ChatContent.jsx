import { Send, MessageSquare } from "lucide-react";
import { useState } from "react";

const ChatContent = ({ selectedChatId }) => {
  const [message, setMessage] = useState("");

  const messages = selectedChatId
    ? [
        { id: 1, sender: "them", text: "Hi there!", time: "10:30 AM" },
        {
          id: 2,
          sender: "me",
          text: "Hello! How can I help you today?",
          time: "10:31 AM",
        },
        {
          id: 3,
          sender: "them",
          text: "I have a question about my account.",
          time: "10:32 AM",
        },
      ]
    : [];

  const handleSend = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  if (!selectedChatId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-bg-light">
        <div className="text-center">
          <MessageSquare className="w-16 h-16 text-primary-medium mx-auto mb-4" />
          <h2 className="text-h2 font-heading font-bold text-primary-dark">
            Select a conversation
          </h2>
          <p className="text-body1 text-primary-medium mt-2">
            Choose a chat from the sidebar to start messaging
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-screen bg-bg-light">
      {/* Chat Header */}
      <div className="p-4 bg-white border-b border-primary-extra-light">
        <h2 className="text-h3 font-heading font-bold text-primary-dark">
          Chat Title
        </h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                msg.sender === "me"
                  ? "bg-black text-white"
                  : "bg-white text-text-light"
              }`}
            >
              <p className="text-body1">{msg.text}</p>
              <span className="text-body2 mt-1 block opacity-75">
                {msg.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 bg-white border-t border-primary-extra-light">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 rounded-lg border border-primary-extra-light focus:outline-none focus:border-primary-medium text-body1"
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="p-2 rounded-lg bg-primary  hover:bg-primary-dark "
          >
            <Send color="#3e9392" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatContent;
