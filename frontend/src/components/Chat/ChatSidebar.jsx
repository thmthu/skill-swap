import { MessageSquare, Search } from "lucide-react";

const ChatSidebar = ({ setReceiver, chats, selectedChat, onSelectChat }) => {
  return (
    <div className=" h-full border-r border-primary-extra-light bg-white">
      <div className="p-4 bg-white border-b border-primary-extra-light">
        <h2 className="text-h3 font-heading font-bold text-primary-dark">
          MESSAGE
        </h2>
      </div>
      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-primary-extra-light bg-bg-light text-body1 focus:outline-none focus:border-primary-medium text-red-950"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-primary-medium" />
        </div>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-140px)]">
        {chats.map((chat) => (
          <div
            key={chat.chatRoomId}
            onClick={() => {
              onSelectChat(chat.chatRoomId);
              setReceiver({
                receiverId: chat.user._id,
                username: chat.user.username,
                profilePic: chat.user.profilePic || "./NAB.png",
              });
            }}
            className={`p-4 cursor-pointer hover:bg-secondary-light-pink transition-colors ${
              selectedChat === chat.chatRoomId ? "bg-secondary-light-pink" : ""
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
                <img
                  src={chat.user.profilePic || "/default-avatar.png"}
                  alt={`${chat.user.username}'s avatar`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-avatar.png";
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="text-subtitle1 font-semibold text-text-light truncate">
                    {chat.user.username}
                  </h3>
                  <span className="text-body1 text-gray-500">{chat.time}</span>
                </div>
                <p className="text-body2 text-primary-medium truncate mt-1">
                  {chat.lastMessage}
                </p>
              </div>
              {chat.unreadCount > 0 && (
                <div className="min-w-[20px] h-5 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-btn2 text-white">
                    {chat.unreadCount}
                  </span>
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
