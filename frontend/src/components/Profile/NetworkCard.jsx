import React from "react";
import { XMarkIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/solid";

const NetworkCard = ({ avatarUrl, name, description }) => {
  return (
    <div className="w-full px-11 py-7 bg-white border-b-2 flex flex-col justify-start items-start gap-14">
      <div className="w-full flex justify-start items-center gap-14">
        {/* Avatar + Info */}
        <div className="w-full flex justify-start items-center gap-8">
          <img
            src={avatarUrl || "https://placehold.co/100x100"}
            alt={name}
            className="w-36 h-36 bg-neutral-200 rounded-3xl object-cover"
          />
          <div className="flex flex-col justify-center items-start gap-3 font-sans">
            <div className="text-text-light text-3xl font-bold">{name}</div>
            <div className="text-text-light font-semibold">
              {description || "No description"}
            </div>
            <div className="text-text-light font-normal">Connected</div>
          </div>
        </div>

        {/* Chat Button */}
        <div className="w-14 h-14 flex justify-center items-center rounded-full border-2 border-blue-600 cursor-pointer hover:bg-blue-50 transition">
          <ChatBubbleOvalLeftIcon className="w-8 h-8 text-blue-600" />
        </div>

        {/* Unfriend Button */}
        <div className="w-14 h-14 flex justify-center items-center border-2 border-primary rounded-full cursor-pointer hover:bg-red-50 transition">
          <XMarkIcon className="w-8 h-8 text-primary" />
        </div>
      </div>
    </div>
  );
};

export default NetworkCard;
