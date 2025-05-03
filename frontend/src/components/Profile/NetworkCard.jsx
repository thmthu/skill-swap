import React from "react";
import ActiveButton from "../Button/ActiveButton";

const NetworkCard = ({ avatarUrl, name, description }) => {
  return (
    <div className="w-full px-6 py-5 bg-white border border-gray-200 border-l-4 border-primary rounded-xl shadow-sm hover:shadow-md transition flex justify-between items-center">
      {/* Info */}
      <div className="flex items-center gap-4">
        <img
          src={avatarUrl || "https://placehold.co/100x100"}
          alt={name}
          className="w-14 h-14 rounded-xl object-cover border-2 border-primary/50 bg-neutral-100"
        />
        <div className="flex flex-col">
          <span className="text-base font-semibold text-gray-900">{name}</span>
          <span className="text-sm text-gray-500">
            {description || "No description"}
          </span>
          <span className="text-sm text-primary font-medium">Connected</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 shrink-0">
        <ActiveButton className="bg-primary/10 text-primary hover:bg-primary/20 text-sm px-3 py-1 rounded-md">
          Chat
        </ActiveButton>
        <ActiveButton className="bg-primary text-white hover:bg-primary/90 text-sm px-3 py-1 rounded-md">
          Remove
        </ActiveButton>
      </div>
    </div>
  );
};

export default NetworkCard;
