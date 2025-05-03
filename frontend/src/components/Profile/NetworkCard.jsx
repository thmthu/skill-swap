import React from "react";
import { XMarkIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/solid";

const NetworkCard = ({ avatarUrl, name, description }) => {
  return (
    <div className="w-full p-6 bg-white rounded-xl shadow-sm border flex justify-between items-center transition hover:shadow-md">
      {/* Avatar + Info */}
      <div className="flex items-center gap-6">
        <img
          src={avatarUrl || "https://placehold.co/100x100"}
          alt={name}
          className="w-16 h-16 rounded-full object-cover border border-gray-200"
        />
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-gray-800">{name}</span>
          <span className="text-sm text-gray-500">
            {description || "No description"}
          </span>
          <span className="text-sm text-green-600 font-medium">Connected</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button className="w-10 h-10 flex items-center justify-center rounded-full border border-blue-600 hover:bg-blue-50 transition">
          <ChatBubbleOvalLeftIcon className="w-5 h-5 text-blue-600" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-full border border-red-500 hover:bg-red-50 transition">
          <XMarkIcon className="w-5 h-5 text-red-500" />
        </button>
      </div>
    </div>
  );
};

export default NetworkCard;
