import axios from "axios";
import NetworkCard from "./NetworkCard";
import { useState, useEffect } from "react";

// const networkUsers = [
// 	{
// 		avatarUrl: "https://placehold.co/80x80",
// 		name: "John Doe",
// 		description: "Frontend Developer @ CompanyX",
// 	},
// 	{
// 		avatarUrl: "https://placehold.co/80x80",
// 		name: "Jane Smith",
// 		description: "UX Designer at DesignIt",
// 	},
// 	{
// 		avatarUrl: "https://placehold.co/80x80",
// 		name: "Alice Green",
// 		description: "React Enthusiast & Blogger",
// 	},
// ];

export default function NetworkList() {
  // Fetch network users from the API
  const [connections, setConnection] = useState([]);
  useEffect(() => {
    const getCookiesByName = (cookieName) => {
      const cookies = document.cookie.split("; ");
      const tokenCookie = cookies.find((cookie) =>
        cookie.startsWith(`${cookieName}=`)
      );
      return tokenCookie ? tokenCookie.split("=")[1] : null;
    };
    const fetchNetworkUsers = async () => {
      let endpoint = "/api/connections/";
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${getCookiesByName("accessToken")}`,
        },
      });
      if (response.status !== 200) {
        console.error("Error fetching network users");
        return;
      }
      setConnection(response.data);
      console.log(response.data);
    };
    fetchNetworkUsers();
  }, []);
  return (
    <div className="flex-1 flex flex-col gap-4">
      <h2 className="text-4xl font-bold mb-4">My Connections</h2>
      {connections.map((user, index) => (
        <NetworkCard
          key={index}
          avatarUrl={user.avatar}
          name={user.username}
          description={user.bio}
        />
      ))}
    </div>
  );
}
