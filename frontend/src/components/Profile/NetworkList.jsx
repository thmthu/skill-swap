import axios from "axios";
import NetworkCard from "./NetworkCard";
import { useState, useEffect } from "react";

export default function NetworkList({ onConnectionDeleted }) {
  const [connections, setConnections] = useState([]);

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
        const response = await axios.get("/api/connections", {
          headers: {
            Authorization: `Bearer ${getCookiesByName("accessToken")}`,
          },
        });

        if (response.status === 200) {
          setConnections(response.data);
        } else {
          console.error("Error fetching network users");
        }
      } catch (error) {
        console.error("Failed to load connections:", error);
      }
    };

    fetchNetworkUsers();
  }, []);

  // ✅ Hàm xoá user khỏi danh sách và gọi callback từ cha
  const handleDeleteUser = (userId) => {
    setConnections((prev) => prev.filter((user) => user._id !== userId));
    onConnectionDeleted?.(); // 🔥 Gọi update connection count ở ProfileCard
  };

  return (
    <div className="flex-1 flex flex-col gap-4">
      <h2 className="text-4xl font-bold mb-4">My Connections</h2>
      {connections.map((user) => (
        <NetworkCard
          key={user._id}
          avatarUrl={user.avatar}
          name={user.username}
          description={user.bio}
          userId={user._id}
          onDeleted={handleDeleteUser} // 🔥 truyền callback xoá
        />
      ))}
    </div>
  );
}
