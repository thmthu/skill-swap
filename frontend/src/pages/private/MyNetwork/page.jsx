import React, { useEffect, useState } from "react";
import ReceivedCard from "./components/ReceivedCard";
import SentCard from "./components/SentCard";
import ConnectionCard from "./components/ConnectionCard";
import Header from "../../../components/Header/Header";
import { io } from "socket.io-client";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

const socket = io("http://localhost:3000");

const MyNetworkPage = () => {
  const [activeTab, setActiveTab] = useState("Sent");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const { user } = useAuth();
  const userId = user._id;
  // console.log(userId);

  const getCookie = (cookieName) => {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((cookie) =>
      cookie.startsWith(`${cookieName}=`)
    );
    return tokenCookie ? tokenCookie.split("=")[1] : null;
  };

  const handleWithdraw = async (data) => {
    try {
      const token = getCookie("accessToken");
      if (!token) throw new Error("Missing auth token");

      await axios.delete(`/api/connections/withdraw/${data.connectionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Update the data state by removing the withdrawn connection
      setData((prevData) =>
        prevData.filter((item) => item.connectionId !== data.connectionId)
      );
      toast.success("Connection withdrawn successfully");
    } catch (error) {
      console.error(
        "Error withdrawing request:",
        error.response?.data || error.message
      );
    }
  };

  const handleAccept = async (data) => {
    try {
      const token = getCookie("accessToken");
      if (!token) throw new Error("Missing auth token");
      await axios.post(
        `/api/connections/accept/${data.connectionId}`,
        {
          userId: data.receiver,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      socket.emit("acceptConnectRequest", {
        connectionId: data.connectionId,
        userId: data._id,
      });
      // Update the data state by removing the accepted connection
      // setData((prevData) =>
      // 	prevData.filter((item) => item.connectionId !== data.connectionId)
      // );
    } catch (error) {
      console.error(
        "Error accepting request:",
        error.response?.data || error.message
      );
    }
  };

  const handleReject = async (data) => {
    try {
      const token = getCookie("accessToken");
      if (!token) throw new Error("Missing auth token");
      await axios.post(
        `/api/connections/reject/${data.connectionId}`,
        {
          userId: data.receiver,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update the data state by removing the rejected connection
      // setData((prevData) =>
      // 	prevData.filter((item) => item.connectionId !== data.connectionId)
      // );
    } catch (error) {
      console.error(
        "Error rejecting request:",
        error.response?.data || error.message
      );
    }
  };

  const handleDelete = async (data) => {
    try {
      const token = getCookie("accessToken");
      if (!token) throw new Error("Missing auth token");
      await axios.delete(`/api/connections/delete/${data.connectionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Update the data state by removing the deleted connection
      setData((prevData) =>
        prevData.filter((item) => item.connectionId !== data.connectionId)
      );
      toast.success("Connection deleted successfully");
    } catch (error) {
      console.error(
        "Error deleting connection:",
        error.response?.data || error.message
      );
    }
  };

  const calculateTimeDifference = (updatedAt) => {
    const now = new Date();
    const updatedDate = new Date(updatedAt);
    const nowUTC = new Date(now.toISOString());
    const updatedDateUTC = new Date(updatedDate.toISOString());

    const diffInMs = nowUTC - updatedDateUTC;

    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    // console.log(nowUTC, updatedDateUTC);
    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }
  };

  useEffect(() => {
    socket.emit("joinUser", userId);
    // Listen for the "requestAccepted" event
    socket.on("connectRequestAccepted", (data) => {
      console.log("Rendering request accepted");
      toast.success(
        `Your connection request to ${data.receiverName} was accepted!`
      );
    });

    return () => {
      socket.off("connectRequestAccepted");
    };
  }, [userId]);

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
          endpoint = "/api/connections/received";
        } else if (activeTab === "New Connections") {
          endpoint = "/api/connections/recent";
        }

        const response = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log(response);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchData();
    console.log("1 data", data);
  }, [activeTab]);

  return (
    <div className="w-auto flex flex-col justify-start items-center gap-12">
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          removeDelay: 2000,

          // Default options for specific types
          success: {
            duration: 5000,
            iconTheme: {
              primary: "green",
              secondary: "white",
            },
          },
        }}
      />
      <Header
        title={"My Network"}
        description={
          "Expand your network to level up your skills or go beyond your comfort zone. \n At NAB, we always encourage new discovery and support from our beloved colleagues."
        }
        buttonText={"Discover"}
      />
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
                handleWithdraw={handleWithdraw}
              />
            ) : activeTab === "Received" ? (
              <ReceivedCard
                data={item}
                key={index}
                formatTime={calculateTimeDifference}
                handleAccept={handleAccept}
                handleReject={handleReject}
              />
            ) : (
              <ConnectionCard
                data={item}
                key={index}
                formatTime={calculateTimeDifference}
                handleDelete={handleDelete}
              />
            )
          )
        )}
      </div>
    </div>
  );
};

export default MyNetworkPage;
