import React, { useEffect, useState } from "react";
import ReceivedCard from "./components/ReceivedCard";
import SentCard from "./components/SentCard";
import ConnectionCard from "./components/ConnectionCard";
import Header from "../../../components/Header/Header";
import axios from "axios";

const MyNetworkPage = () => {
    const [activeTab, setActiveTab] = useState("Sent");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state

    const getCookie = (cookieName) => {
        const cookies = document.cookie.split("; ");
        const tokenCookie = cookies.find((cookie) =>
            cookie.startsWith(`${cookieName}=`)
        );
        return tokenCookie ? tokenCookie.split("=")[1] : null;
    };

    // Fetch data based on the active tab
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Set loading to true before fetching
            try {
                const token = getCookie("accessToken");
                if (!token) throw new Error("Missing auth token");

                let endpoint;
                if (activeTab === "Sent") {
                    endpoint = "http://localhost:3000/api/connections/sent";
                } else if (activeTab === "Received") {
                    endpoint = "http://localhost:3000/api/connections/received";
                } else if (activeTab === "New Connections") {
                    endpoint = "http://localhost:3000/api/connections/recent";
                }

                const response = await axios.get(endpoint, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        (async () => {
            await fetchData();
        })();
    }, [activeTab]);

    const calculateTimeDifference = (updatedAt) => {
        const now = new Date();
        const updatedDate = new Date(updatedAt);
        const diffInMs = now - updatedDate;

        const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

        if (days > 0) {
            return `${days} day${days > 1 ? "s" : ""} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? "s" : ""} ago`;
        } else {
            return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
        }
    };

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
            </div>
            <div className="flex flex-col w-[84vw]">
                {loading ? ( // Show loading spinner or placeholder while fetching
                    <div className="text-center text-gray-500">Loading...</div>
                ) : (
                    data.map((item, index) =>
                        activeTab === "Sent" ? (
                            <SentCard
                                data={item}
                                key={index}
                                formatTime={calculateTimeDifference}
                            />
                        ) : activeTab === "Received" ? (
                            <ReceivedCard
                                data={item}
                                key={index}
                                formatTime={calculateTimeDifference}
                            />
                        ) : (
                            <ConnectionCard
                                data={item}
                                key={index}
                                formatTime={calculateTimeDifference}
                            />
                        )
                    )
                )}
            </div>
        </div>
    );
};

export default MyNetworkPage;