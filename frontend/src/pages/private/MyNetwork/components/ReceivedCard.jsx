import React from "react";
import {
	XMarkIcon,
	CheckIcon,
	ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";

const ReceivedCard = ({ data, formatTime, handleAccept, handleReject }) => {
	const [isResponse, setIsResponse] = useState("notResponsed");
	return (
		<div
			data-property-1="Received"
			className="w-full px-6 py-4 md:px-11 md:py-7 bg-transparent border-b-2 flex flex-row justify-between items-center gap-6 md:gap-14"
		>
			{/* Card Content */}
			<div className="flex flex-row justify-start items-center gap-4 md:gap-8">
				{/* Profile Image */}
				<img
					src={
						"https://www.bellavistahotel.com.au/wp-content/uploads/sites/3/2017/05/Grey-Box.jpeg"
					}
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
					<div className="w-10 h-10 md:w-14 md:h-14 flex justify-center items-center rounded-full border-2 border-blue-600">
						<ChatBubbleOvalLeftIcon className="w-6 md:w-8 text-semantic-blue" />
					</div>

					{/* Decline Icon */}
					<div
						onClick={async () => {
							await handleReject(data);
							setIsResponse("Rejected");
						}}
						className="w-10 h-10 md:w-14 md:h-14 flex justify-center items-center border-primary border-2 rounded-full"
					>
						<XMarkIcon className="w-6 md:w-8 text-primary" />
					</div>

					{/* Accept Icon */}
					<div
						onClick={async () => {
							await handleAccept(data);
							setIsResponse("Accepted");
						}}
						className="w-10 h-10 md:w-14 md:h-14 flex justify-center items-center border-semantic-green border-2 rounded-full"
					>
						<CheckIcon className="w-6 md:w-8 text-semantic-green" />
					</div>
				</div>
			) : (
				<div className="text-text-light">{isResponse}</div>
			)}
		</div>
	);
};

export default ReceivedCard;
