"use client";
import { useState, useMemo } from "react";
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

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = useMemo(() => {
    return users.slice(indexOfFirstUser, indexOfLastUser);
  }, [users, indexOfFirstUser, indexOfLastUser]);

  const totalPages = useMemo(
    () => Math.ceil(users.length / usersPerPage),
    [users.length]
  );

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section
      style={{ overflowAnchor: "none" }}
      className="max-w-6xl mx-auto px-6 space-y-8 overflow-anchor-none"
    >
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

      {/* Cards Grid */}
      {!loading && !error && (
        <>
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8 items-stretch overflow-anchor-none">
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <UserCard
                  key={user.id}
                  image={user.image || "/NAB.png"}
                  name={user.name}
                  tags={user.tags || []}
                  department={user.department || "Unknown Department"}
                  userId={user.id}
                />
              ))
            ) : (
              <div className="col-span-full text-center mt-8 text-body1 font-medium text-text-light dark:text-text-dark">
                No mentors found. Try another keyword!
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {/* Pagination Controls */}
          {users.length > 0 && totalPages > 1 && (
            <div className="flex justify-center gap-2 pt-8">
              {/* Prev Button */}
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded font-medium transition-colors duration-200
      ${
        currentPage === 1
          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
          : "bg-primary text-white hover:bg-primary-dark"
      }`}
              >
                Prev
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    return (
                      page === 1 ||
                      page === totalPages ||
                      Math.abs(page - currentPage) <= 1
                    );
                  })
                  .map((page, index, array) => {
                    const showEllipsis =
                      index > 0 && array[index - 1] !== page - 1;

                    return (
                      <div key={`page-${page}`} className="flex items-center">
                        {showEllipsis && (
                          <span className="px-2 select-none">...</span>
                        )}
                        <button
                          onClick={() => paginate(page)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-medium transition-colors duration-200
                ${
                  currentPage === page
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-primary-light"
                }`}
                        >
                          {page}
                        </button>
                      </div>
                    );
                  })}
              </div>

              {/* Next Button */}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
                className={`px-3 py-1 rounded font-medium transition-colors duration-200
      ${
        currentPage === totalPages || totalPages === 0
          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
          : "bg-primary text-white hover:bg-primary-dark"
      }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
