import React from "react";
import NetworkCard from "./NetworkCard";

const networkUsers = [
  {
    id: "u1",
    avatarUrl: "https://placehold.co/80x80",
    name: "John Doe",
    description: "Frontend Developer @ CompanyX",
  },
  {
    id: "u2",
    avatarUrl: "https://placehold.co/80x80",
    name: "Jane Smith",
    description: "UX Designer at DesignIt",
  },
  {
    id: "u3",
    avatarUrl: "https://placehold.co/80x80",
    name: "Alice Green",
    description: "React Enthusiast & Blogger",
  },
];

export default function NetworkList() {
  return (
    <div className="flex-1 flex flex-col gap-4">
      <h2 className="text-4xl font-bold mb-4">My Connections</h2>
      {networkUsers.map((user) => (
        <NetworkCard
          key={user.id}
          avatarUrl={user.avatarUrl}
          name={user.name}
          description={user.description}
        />
      ))}
    </div>
  );
}
