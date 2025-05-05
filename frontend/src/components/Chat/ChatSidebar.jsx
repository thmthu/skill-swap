import { MessageSquare, Search } from "lucide-react";

const ChatSidebar = ({ setReceiver, chats, selectedChat, onSelectChat }) => {
  return (
    <div className="h-full border-r border-primary-extra-light bg-white md:w-auto w-16 transition-all">
      <div className="p-4 py-6 bg-white border-b border-primary-extra-light">
        <h2 className="text-h3 font-heading font-bold text-primary-dark md:block hidden">
          MESSAGE
        </h2>
        <MessageSquare className="h-6 w-6 mx-auto text-primary-dark md:hidden" />
      </div>
      {/* Search - hidden on small screens */}
      <div className="p-4 md:block hidden">
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
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 relative">
                <img
                  src={chat.user.profilePic || "/NAB.png"}
                  alt={`${chat.user.username}'s avatar`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-avatar.png";
                  }}
                />
                {chat.unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-primary flex items-center justify-center">
                    <span className="text-xs text-white">
                      {chat.unreadCount}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0 md:block hidden">
                <div className="flex justify-between items-start">
                  <h3 className="text-subtitle1 font-semibold text-text-light truncate">
                    {chat.user.username}
                  </h3>
                  <span className="text-body1 text-gray-500">{chat.time}</span>
                </div>
                <p className="text-body2 text-primary-medium truncate mt-1">
                  {chat.lastMessage}
                </p>
                {chat.unreadCount > 0 && (
                  <div className="min-w-[20px] h-5 rounded-full bg-primary flex items-center justify-center ml-auto mt-1">
                    <span className="text-btn2 text-white">
                      {chat.unreadCount}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
