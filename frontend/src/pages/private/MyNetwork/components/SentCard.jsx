import React from "react";
import AlertPopup from "./AlertPopup";
import ActiveButton from "../../../../components/Button/ActiveButton";

const SentCard = ({ data, formatTime, handleWithdraw }) => {
	return (
		<div className="w-full px-6 py-4 md:px-11 md:py-7 bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 flex justify-between items-center gap-6 md:gap-14">
			<div className="flex items-center gap-4 md:gap-8">
				<img
					src={data.avatar || "/NAB.png"}
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
						Sent {formatTime(data.timestamp)}
					</div>
				</div>
			</div>

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
					<ActiveButton children="Withdraw" className="text-white" />
				</AlertPopup>
			</div>
		</div>
	);
};

export default SentCard;
