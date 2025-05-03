import React, { useState, useEffect } from "react";
import axios from "axios";
import NetworkCard from "./NetworkCard";

export default function NetworkList() {
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
      try {
        const endpoint = "/api/connections/";
        const accessToken = getCookiesByName("accessToken");

        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // ✅ fix ở đây nè
          },
        });

        if (response.status === 200) {
          setConnection(response.data);
          console.log(response.data);
        } else {
          console.error("Error fetching network users:", response.status);
        }
      } catch (err) {
        console.error("Error fetching network users:", err);
      }
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
