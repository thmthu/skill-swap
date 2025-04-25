import { MessageSquare, Search } from "lucide-react";

const ChatSidebar = ({ chats, selectedChat, onSelectChat }) => {
  return (
    <div className="w-80 border-r border-primary-extra-light bg-white">
      <div className="p-4 bg-white border-b border-primary-extra-light">
        <h2 className="text-h3 font-heading font-bold text-primary-dark">
          MESSAGE
        </h2>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-140px)]">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`p-4 cursor-pointer hover:bg-secondary-light-pink transition-colors ${
              selectedChat === chat.id ? "bg-secondary-light-pink" : ""
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="text-subtitle1 font-semibold text-text-light truncate">
                    {chat.name}
                  </h3>
                  <span className="text-body2 text-primary-medium">
                    {chat.time}
                  </span>
                </div>
                <p className="text-body2 text-primary-medium truncate mt-1">
                  {chat.lastMessage}
                </p>
              </div>
              {chat.unread > 0 && (
                <div className="min-w-[20px] h-5 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-btn2 text-white">{chat.unread}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
