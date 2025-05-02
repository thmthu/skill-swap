import { useEffect, useState } from "react";
import NetworkCard from "./NetworkCard";
import axios from "@/lib/axiosClient";

export default function NetworkList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await axios.get("/users/connections");
        setUsers(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch connections:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, []);

  if (loading) return <p>Loading connections...</p>;

  return (
    <div className="flex-1 flex flex-col gap-4">
      <h2 className="text-4xl font-bold mb-4">My Connections</h2>

      {users.length === 0 ? (
        <p className="text-gray-500 text-lg italic">
          You have no connections yet.
        </p>
      ) : (
        users.map((user) => (
          <NetworkCard
            key={user._id}
            avatarUrl={user.avatar}
            name={user.username}
            description={user.bio}
          />
        ))
      )}
    </div>
  );
}
