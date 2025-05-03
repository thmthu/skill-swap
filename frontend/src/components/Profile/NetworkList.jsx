import { useEffect, useState } from "react";
import NetworkCard from "./NetworkCard";

export default function NetworkList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConnections = async () => {
      let endpoint = "/api/connections/";
      const response = await axios.get(endpoint, {
          headers: {
              Authorization: Bearer ${getCookiesByName("accessToken")},
          },
      });
      if (response.status !== 200) {
          console.error("Error fetching network users");
          return;
      }
      setConnection(response.data);
      console.log(response.data);
    };

    fetchConnections();
  }, []);

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
