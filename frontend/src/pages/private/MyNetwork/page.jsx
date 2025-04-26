import React from "react";
import ReceivedCard from "./components/ReceivedCard";
import SentCard from "./components/SentCard";

const MyNetworkPage = () => {
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
		<div>
			<div className="flex flex-col w-[84vw]">
				{fakeData.map((item, index) => (
					<SentCard data={item} key={index} />
				))}
			</div>
		</div>
	);
};
export default MyNetworkPage;
