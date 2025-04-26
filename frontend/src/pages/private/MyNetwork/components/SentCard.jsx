import React from "react";
import ActiveButton from "../../../../components/Button/ActiveButton";

const SentCard = ({ data }) => {
	return (
		<div
			data-property-1="Received"
			className="w-full px-11 py-7 bg-white border-b-2 flex flex-col justify-start items-start gap-14"
		>
			<div className="w-full flex justify-start items-center gap-14">
				<div className="w-full flex justify-around items-center gap-8">
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
							<div className="text-text-light font-normal">
								Received {data.timestamp}
							</div>
						</div>
					</div>
					<ActiveButton content="Withdraw" />
				</div>
			</div>
		</div>
	);
};

export default SentCard;
