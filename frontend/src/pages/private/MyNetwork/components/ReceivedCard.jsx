import React from "react";
import {
	XMarkIcon,
	CheckIcon,
	ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/solid";

const ReceivedCard = ({ data }) => {
	return (
		<div
			data-property-1="Received"
			className="w-full px-11 py-7 bg-white border-b-2 flex flex-col justify-start items-start gap-14"
		>
			<div className="w-full flex justify-start items-center gap-14">
				<div className="w-full flex justify-start items-center gap-8">
					<img
						src={
							"https://www.bellavistahotel.com.au/wp-content/uploads/sites/3/2017/05/Grey-Box.jpeg"
						}
						alt={data.name}
						className="w-36 h-36 bg-neutral-200 rounded-3xl"
					/>
					{/* Card Data */}
					<div className="flex flex-col justify-center items-start gap-3 font-sans">
						<div className="text-text-light text-3xl font-bold">
							{data.name}
						</div>
						<div className="text-text-light font-semibold">
							{data.department}
						</div>
						<div className="text-text-light font-normal">Received {data.timestamp}</div>
					</div>
				</div>
				<div className="w-14 h-14 relative">
					<div className="w-14 h-14 flex justify-center items-center rounded-full border-2 border-blue-600">
						<ChatBubbleOvalLeftIcon className="w-8 text-semantic-blue" />
					</div>
				</div>
				<div className="w-14 h-14 relative">
					<div className="w-14 h-14 flex justify-center items-center border-primary border-2 rounded-full">
						<XMarkIcon className="w-8 text-primary" />
					</div>
				</div>
				<div className="w-14 h-14 relative bg-white">
					<div className="flex justify-center items-center w-14 h-14 border-semantic-green border-2 rounded-full">
						<CheckIcon className="w-8 text-semantic-green" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReceivedCard;
