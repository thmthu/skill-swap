"use client";
import UserCard from "@/pages/public/Home/lists/UserCard";
import GradientHeading from "@/components/Text/GradientHeading";
import { LoadingSkeleton } from "@/components/Skeleton/LoadingSkeleton";
import SearchBar from "@/components/ToolBar/SearchBar";
import { useSearchUser } from "@/hooks/useSearchUser";
import Spinner from "@/components/Skeleton/Spinner";
export default function UserCardList() {
  const {
    users,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedSkills,
    setSelectedSkills,
  } = useSearchUser("");

  return (
    <section className="py-24 max-w-6xl mx-auto px-6 space-y-8">
      {/* Heading + Search/Filter Bar */}
      <div className="flex flex-col gap-6">
        <div className="text-center">
          <GradientHeading>Explore Our Mentors</GradientHeading>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-4">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            selectedSkills={selectedSkills}
            onSkillsChange={setSelectedSkills}
          />
        </div>
      </div>

      {error && <div className="text-center text-red-500 mt-8">{error}</div>}
      {/* This part changes: Card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8 min-h-[400px]">
        {loading ? (
          <div className="col-span-full flex justify-center items-center">
            <Spinner size="large" />
          </div>
        ) : error ? (
          <div className="col-span-full text-center text-red-500">{error}</div>
        ) : users.length > 0 ? (
          users.map((user) => (
            <UserCard
              key={user.userId}
              image="/NAB.png"
              name={user.name}
              tags={user.tags || []}
              description={user.description}
              department={user.department || "Unknown Department"}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-body1 font-medium text-text-light dark:text-text-dark">
            No mentors found. Try another keyword!
          </div>
        )}
      </div>
    </section>
  );
}
