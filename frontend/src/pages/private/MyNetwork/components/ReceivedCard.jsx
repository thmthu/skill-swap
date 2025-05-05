import React, { useState } from "react";
import {
	XMarkIcon,
	CheckIcon,
	ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const ReceivedCard = ({ data, formatTime, handleAccept, handleReject }) => {
	const [isResponse, setIsResponse] = useState("notResponsed");
	const navigate = useNavigate();
	const handleChatClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		console.log("Daya at connection", data);
		navigate("/chat", {
			state: {
				receiverId: data._id,
				username: data.username,
				profilePic: data.avatar || "",
			},
		});
	};
	return (
		<div
			data-property-1="Received"
			className="w-full px-6 py-4 md:px-11 md:py-7 bg-transparent border-b-2 flex flex-row justify-between items-center gap-6 md:gap-14"
		>
			{/* Card Content */}
			<div className="flex flex-row justify-start items-center gap-4 md:gap-8">
				{/* Profile Image */}
				<img
					src={data.avatar || "/NAB.png"}
					alt={data.username}
					className="w-20 h-20 md:w-36 md:h-36 bg-neutral-200 rounded-3xl"
				/>

				{/* Card Data */}
				<div className="flex flex-col justify-center items-start gap-2 md:gap-3 font-sans">
					<div className="text-text-light text-xl md:text-3xl font-bold">
						{data.username}
					</div>
					<div className="text-text-light text-sm md:text-base font-semibold">
						{data.department}
					</div>
					<div className="text-text-light text-xs md:text-sm font-normal">
						Received {formatTime(data.timestamp)}
					</div>
				</div>
			</div>

			{/* Action Buttons */}
			{isResponse == "notResponsed" ? (
				<div className="flex flex-row justify-end items-center gap-4 md:gap-6">
					{/* Chat Icon */}
					<div
						className="w-10 h-10 md:w-14 md:h-14 flex justify-center items-center rounded-full border-2 border-blue-600"
						onClick={handleChatClick}
					>
						<ChatBubbleOvalLeftIcon className="w-6 md:w-8 text-semantic-blue" />
					</div>

					{/* Decline Icon */}
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
