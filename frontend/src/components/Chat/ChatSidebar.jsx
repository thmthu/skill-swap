import { MessageSquare, Search } from "lucide-react";

const ChatSidebar = ({ setReceiver, chats, selectedChat, onSelectChat }) => {
	return (
		<div className="h-full border-r border-primary-extra-light dark:border-gray-700 bg-white dark:bg-gray-900">
			<div className="p-4 bg-white dark:bg-gray-800 border-b border-primary-extra-light dark:border-gray-700">
				<h2 className="text-h3 font-heading font-bold text-primary-dark dark:text-white">
					MESSAGE
				</h2>
				<MessageSquare className="h-6 w-6 text-primary-dark md:hidden block" />
			</div>
			{/* Search - hidden on small screens */}
			<div className="p-4">
				<div className="relative">
					<input
						type="text"
						placeholder="Search conversations..."
						className="w-full pl-10 pr-4 py-2 rounded-lg border border-primary-extra-light bg-bg-light text-body1 focus:outline-none focus:border-primary-medium text-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
					/>
					<Search className="absolute left-3 top-2.5 h-5 w-5 text-primary-medium" />
				</div>
			</div>

			{/* Chat List */}
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
						className={`p-4 cursor-pointer hover:bg-secondary-light-pink dark:hover:bg-gray-700 transition-colors ${
							selectedChat === chat.chatRoomId
								? "bg-secondary-light-pink dark:bg-gray-800"
								: ""
						} flex justify-center md:justify-start`}
					>
						<div className="flex items-start gap-3 md:w-full w-auto">
							<div className="w-10 h-10 rounded-full overflow-hidden md:mr-3 mr-0 flex-shrink-0 relative">
								<img
									src={chat.user.profilePic || "/NAB.png"}
									alt={`${chat.user.username}'s avatar`}
									className={`w-full h-full object-cover ${
										chat.unreadCount > 0 ? "md:opacity-100 opacity-40" : ""
									}`}
									onError={(e) => {
										e.target.onerror = null;
										e.target.src = "/default-avatar.png";
									}}
								/>
								{/* Mobile unread count badge - centered over avatar */}
								{chat.unreadCount > 0 && (
									<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[18px] h-[18px] rounded-full bg-primary flex items-center justify-center border-2 border-white z-10 md:hidden block">
										<span className="text-xs text-white flex items-center justify-center w-full h-full leading-none font-bold">
											{chat.unreadCount}
										</span>
									</div>
								)}
							</div>
							<div className="flex-1 min-w-0 md:block hidden">
								<div className="flex justify-between items-start relative">
									<h3 className="text-subtitle1 font-semibold text-text-light dark:text-white truncate">
										{chat.user.username}
									</h3>
									<span className="text-body1 text-gray-500">{chat.time}</span>

									{/* Desktop unread count badge - absolute positioned */}
									{chat.unreadCount > 0 && (
										<div className="absolute -right-1 -top-4 min-w-[20px] h-5 rounded-full bg-primary flex items-center justify-center">
											<span className="text-btn2 text-white flex items-center justify-center w-full h-full leading-none">
												{chat.unreadCount}
											</span>
										</div>
									)}
								</div>
								<p className="text-body2 text-primary-medium truncate mt-1">
									{chat.lastMessage}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ChatSidebar;
