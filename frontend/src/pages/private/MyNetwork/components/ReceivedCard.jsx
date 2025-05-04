import React, { useState } from "react";
import {
  XMarkIcon,
  CheckIcon,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/solid";

const ReceivedCard = ({ data, formatTime, handleAccept, handleReject }) => {
  const [isResponse, setIsResponse] = useState("notResponsed");

  return (
    <div className="w-full px-6 py-4 md:px-11 md:py-7 bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 flex justify-between items-center gap-6 md:gap-14">
      <div className="flex items-center gap-4 md:gap-8">
        <img
          src="https://www.bellavistahotel.com.au/wp-content/uploads/sites/3/2017/05/Grey-Box.jpeg"
          alt={data.username}
          className="w-20 h-20 md:w-36 md:h-36 bg-gray-200 rounded-3xl object-cover"
        />
        <div className="flex flex-col gap-1 text-left">
          <div className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {data.username}
          </div>
          <div className="text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300">
            {data.department}
          </div>
          <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
            Received {formatTime(data.timestamp)}
          </div>
        </div>
      </div>

      {isResponse === "notResponsed" ? (
        <div className="flex gap-4 md:gap-6">
          <div className="w-10 h-10 md:w-14 md:h-14 flex justify-center items-center rounded-full border-2 border-blue-600">
            <ChatBubbleOvalLeftIcon className="w-6 md:w-8 text-blue-600" />
          </div>

          <div
            onClick={async () => {
              await handleReject(data);
              setIsResponse("Rejected");
            }}
            className="w-10 h-10 md:w-14 md:h-14 flex justify-center items-center border-2 border-red-600 rounded-full cursor-pointer"
          >
            <XMarkIcon className="w-6 md:w-8 text-red-600" />
          </div>

          <div
            onClick={async () => {
              await handleAccept(data);
              setIsResponse("Accepted");
            }}
            className="w-10 h-10 md:w-14 md:h-14 flex justify-center items-center border-2 border-green-600 rounded-full cursor-pointer"
          >
            <CheckIcon className="w-6 md:w-8 text-green-600" />
          </div>
        </div>
      ) : (
        <div className="text-gray-800 dark:text-gray-200">{isResponse}</div>
      )}
    </div>
  );
};

export default ReceivedCard;
