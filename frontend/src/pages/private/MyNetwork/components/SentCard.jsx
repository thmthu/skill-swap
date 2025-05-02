import React from "react";
import AlertPopup from "./AlertPopup";
import ActiveButton from "../../../../components/Button/ActiveButton";

const SentCard = ({ data, formatTime, handleWithdraw }) => {
	return (
		<div
			data-property-1="Sent"
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
						Sent {formatTime(data.timestamp)}
					</div>
				</div>
			</div>

			{/* Action Button */}
			<div className="flex justify-end items-center">
				<AlertPopup
					handleWithdraw={handleWithdraw}
					data={data}
					className="w-10 h-10 md:w-14 md:h-14 flex justify-center items-center border-none rounded-full"
					iconClassName="w-6 md:w-8 text-primary"
					icon={<img src="path/to/withdraw-icon.png" alt="Withdraw" />}
					tooltipText="Withdraw"
					title="Confirm Withdrawal"
					description="Are you sure you want to withdraw?"
					onCancel={() => console.log("Cancelled")}
					onConfirm={() => handleWithdraw(data)}
				>
					<ActiveButton children="Withdraw" className="text-text-dark" />
				</AlertPopup>
			</div>
		</div>
	);
};

export default SentCard;
