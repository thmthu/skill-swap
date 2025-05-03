import { useNavigate } from "react-router-dom";

const ChatNotification = ({ toast, route, sender, message, chatRoomId }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex mb-3 cursor-pointer`}
      onClick={() => {
        navigate(route, {
          state: { selectedChatId: chatRoomId },
        });
        toast.dismiss(t.id);
      }}
    >
      <div className="flex-1 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={sender.avatar || "/default-avatar.png"}
              alt=""
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">{sender.name}</p>
            <p className="mt-1 text-sm text-gray-500 truncate max-w-[250px]">
              {message}
            </p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toast.dismiss(t.id);
          }}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ChatNotification;
