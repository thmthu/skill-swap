"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "@/pages/public/Home/lists/UserCard";
import { API_CONFIG } from "@/lib/config";
import GradientHeading from "@/components/Text/GradientHeading";
import { LoadingSkeleton } from "@/components/Skeleton/LoadingSkeleton";
import SearchBar from "@/components/ToolBar/SearchBar";
import { useSearchUser } from "@/hooks/useSearchUser";

export default function UserCardList() {
  const { users, loading, error, searchTerm, setSearchTerm } =
    useSearchUser("");

  //Fetch users from the API
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       console.log("Fetching users...");
  //       const response = await axios.get(`${API_CONFIG.BASE_URL}/users`);
  //       console.log("Fetched users:", response.data);

  //       if (Array.isArray(response.data)) {
  //         const mappedUsers = response.data.map((user) => ({
  //           id: user.userId,
  //           image: "/NAB.png", // static image placeholder
  //           name: user.username,
  //           tags: user.teach || [],
  //           description: generateDynamicDescription(user),
  //         }));

  //         setUsers(mappedUsers);
  //       } else {
  //         console.error("Unexpected users format:", response.data);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch users:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  //Uncomment this block to use mock data instead of API
  // useEffect(() => {
  //   // Simulate async API fetching
  //   const fetchMockUsers = async () => {
  //     try {
  //       console.log("Loading mock users...");
  //       await new Promise((resolve) => setTimeout(resolve, 500)); // simulate 0.5s delay
  //       setUsers(mockUsers);
  //       console.log("Mock users loaded:", mockUsers);
  //     } catch (error) {
  //       console.error("Failed to load mock users:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchMockUsers();
  // }, []);

  return (
    <section className="py-24 max-w-6xl mx-auto px-6 space-y-8">
      {/* Heading + Search/Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <GradientHeading>Explore Our Mentors</GradientHeading>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />{" "}
        {/* <- put it properly beside the title */}
      </div>
      {/* Loading or Error */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
          {Array.from({ length: 6 }).map((_, idx) => (
            <LoadingSkeleton key={idx} />
          ))}
        </div>
      )}

      {error && <div className="text-center text-red-500 mt-8">{error}</div>}

      {/* Cards Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
          {users.length > 0 ? (
            users.map((user) => (
              <UserCard
                key={user.userId}
                image="/NAB.png"
                name={user.name}
                tags={user.tags || []}
                description={user.message}
              />
            ))
          ) : (
            <div className="col-span-full text-center mt-8 text-body1 font-medium text-text-light dark:text-text-dark">
              No mentors found. Try another keyword!
            </div>
          )}
        </div>
      )}
    </section>
  );
}
// <section className="py-24 max-w-6xl mx-auto px-6">
//   <GradientHeading>Explore Our Mentors</GradientHeading>
//   <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
//     <ToolbarDynamic
//       searchQuery={searchQuery}
//       setSearchQuery={setSearchQuery}
//     />
{
  /* SkillsFilter coming soon... */
}
// </div>
/* SkillsFilter coming soon... */

/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           
            {Array.from({ length: 6 }).map((_, index) => (
              <UserCardSkeleton key={index} />
            ))}
          </div>
        ) : users.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {users.map((user) => (
              <UserCard
                key={user.userId}
                image="/NAB.png"
                name={user.username}
                tags={user.teach || []}
                description={generateDynamicDescription(user)}
              />
            ))}
          </div>
        ) : (
          <div className="col-span-full text-center mt-8 text-body1 font-medium text-text-light dark:text-text-dark">
            No mentors found at the moment.
            <br />
            Please check back later!
          </div>
        )}
      </div> */
// </section>
