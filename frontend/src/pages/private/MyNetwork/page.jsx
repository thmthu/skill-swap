import React from "react";
import { useState } from "react";
import ReceivedCard from "./components/ReceivedCard";
import SentCard from "./components/SentCard";
import ConnectionCard from "./components/ConnectionCard";
import Header from "../../../components/Header/Header";

const MyNetworkPage = () => {
	const [activeTab, setActiveTab] = useState("Sent");
	const fakeData = [
		{
			name: "Qui Huynh",
			department: "Product and Technology Department",
			timestamp: "2 days ago",
		},
		{
			name: "John Doe",
			department: "Marketing Department",
			timestamp: "3 days ago",
		},
		{
			name: "Jane Smith",
			department: "Sales Department",
			timestamp: "1 day ago",
		},
		{
			name: "Alice Johnson",
			department: "HR Department",
			timestamp: "5 days ago",
		},
		{
			name: "Bob Brown",
			department: "Finance Department",
			timestamp: "4 days ago",
		},
	];
	return (
		<div className="w-auto flex flex-col justify-start items-center gap-12">
			<Header />
			<div className="flex w-[84vw]">
				{["Sent", "Received", "New Connections"].map((item, index) => (
					<div
						className="w-full md:w-[33%] flex flex-col justify-start items-center gap-1"
						onClick={() => setActiveTab(item)}
						key={index}
					>
						<div className="text-center text-black text-lg md:text-3xl font-semibold font-['Poppins']">
							{item}
						</div>
						<div
							className={`self-stretch h-1 rounded-sm ${
								activeTab === item ? "bg-red-800" : "bg-[#D9D9D9]"
							}`}
						/>
					</div>
				))}
				<div className="absolute bottom-0 self-stretch h-1 rounded-sm bg-[#D9D9D9]" />
			</div>
			<div className="flex flex-col w-[84vw]">
				{fakeData.map((item, index) =>
					activeTab === "Sent" ? (
						<SentCard data={item} key={index} />
					) : activeTab === "Received" ? (
						<ReceivedCard data={item} key={index} />
					) : (
						<ConnectionCard data={item} key={index} />
					)
				)}
			</div>
		</div>
	);
};
export default MyNetworkPage;
