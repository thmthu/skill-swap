"use client";
import { useState, useMemo } from "react";
import UserCard from "@/pages/public/Home/lists/UserCard";
import GradientHeading from "@/components/Text/GradientHeading";
import { LoadingSkeleton } from "@/components/Skeleton/LoadingSkeleton";
import SearchBar from "@/components/ToolBar/SearchBar";
import { useSearchUser } from "@/hooks/useSearchUser";

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
  
  const totalPages = useMemo(() => Math.ceil(users.length / usersPerPage), [users.length]);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-6 space-y-8">
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
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <UserCard
                  key={user.id}
                  image={user.image||"/NAB.png"}
                  name={user.name}
                  tags={user.tags || []}
                  department={user.department || "Unknown Department"}
                />
              ))
            ) : (
              <div className="col-span-full text-center mt-8 text-body1 font-medium text-text-light dark:text-text-dark">
                No mentors found. Try another keyword!
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {users.length > 0 && (
            <div className="flex justify-center gap-2 pt-8">
              <button 
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${
                  currentPage === 1 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Prev
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => {
                    // Show current page and 1 page on each side
                    return page === 1 || 
                           page === totalPages || 
                           Math.abs(page - currentPage) <= 1;
                  })
                  .map((page, index, array) => (
                    <>
                      {index > 0 && array[index - 1] !== page - 1 && (
                        <span key={`ellipsis-${page}`} className="px-2">...</span>
                      )}
                      <button
                        key={page}
                        onClick={() => paginate(page)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                      >
                        {page}
                      </button>
                    </>
                  ))}
              </div>
              
              <button 
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
                className={`px-3 py-1 rounded ${
                  currentPage === totalPages || totalPages === 0
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
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
