import { useState, useMemo } from "react";
import UserCard from "@/pages/public/Home/lists/UserCard";
import GradientHeading from "@/components/Text/GradientHeading";
import { LoadingSkeleton } from "@/components/Skeleton/LoadingSkeleton";
import SearchBar from "@/components/ToolBar/SearchBar";
import { useSearchUser } from "@/hooks/useSearchUser";

import Spinner from "@/components/Skeleton/Spinner";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

export default function UserCardList({ connections, sentRequest }) {
	const {
		users,
		loading,
		error,
		searchTerm,
		setSearchTerm,
		selectedSkills,
		setSelectedSkills,
	} = useSearchUser("");

	const { isAuthenticated } = useAuth();

	const [currentPage, setCurrentPage] = useState(1);
	const usersPerPage = 6;

	const indexOfLastUser = currentPage * usersPerPage;
	const indexOfFirstUser = indexOfLastUser - usersPerPage;
	const currentUsers = useMemo(() => {
		return users.slice(indexOfFirstUser, indexOfLastUser);
	}, [users, indexOfFirstUser, indexOfLastUser]);
	// console.log("Current Users", currentUsers);

	const totalPages = useMemo(
		() => Math.ceil(users.length / usersPerPage),
		[users.length]
	);

	const paginate = (pageNumber) => {
		if (pageNumber > 0 && pageNumber <= totalPages) {
			setCurrentPage(pageNumber);
			// window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	const getCookie = (cookieName) => {
		const cookies = document.cookie.split("; ");
		const tokenCookie = cookies.find((cookie) =>
			cookie.startsWith(`${cookieName}=`)
		);
		return tokenCookie ? tokenCookie.split("=")[1] : null;
	};

	const handleConnect = async (receiverId) => {
		const token = getCookie("accessToken");
		// console.log(token);
		if (!token) throw new Error("Missing auth token");
		const endpoint = `http://localhost:3000/api/connections/create/${receiverId}`;
		const response = await axios.post(
			endpoint,
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		if (response.status == 200) {
			toast.success(response.data.message);
			// console.log("Connection request sent successfully");
		} else {
			toast.error("Failed to send connection request");
			// console.error("Failed to send connection request");
		}
	};

	const renderPagination = () => {
		const pageNumbers = [];
		for (let i = 1; i <= totalPages; i++) {
			if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
				pageNumbers.push(i);
			} else if (pageNumbers[pageNumbers.length - 1] !== "...") {
				pageNumbers.push("...");
			}
		}

		return (
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							onClick={() => paginate(currentPage - 1)}
							className={cn(
								"rounded-md px-3 py-1.5 text-sm font-semibold transition-colors",
								currentPage === 1
									? "pointer-events-none opacity-50 bg-muted text-muted-foreground dark:bg-zinc-800 dark:text-zinc-500"
									: "bg-white text-black hover:bg-primary-light dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-700"
							)}
						/>
					</PaginationItem>

					{pageNumbers.map((page, index) => (
						<PaginationItem key={index}>
							{page === "..." ? (
								<PaginationEllipsis className="text-gray-900 dark:text-gray-400" />
							) : (
								<PaginationLink
									isActive={page === currentPage}
									onClick={() => paginate(page)}
									className={cn(
										"rounded-md px-3 py-1.5 text-sm font-medium transition-colors border",
										page === currentPage
											? "bg-primary text-white border-primary dark:bg-primary-medium dark:text-black"
											: "bg-white text-black  hover:bg-primary-light dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-700  dark:border-zinc-600"
									)}
								>
									{page}
								</PaginationLink>
							)}
						</PaginationItem>
					))}

					<PaginationItem>
						<PaginationNext
							onClick={() => paginate(currentPage + 1)}
							className={cn(
								"rounded-md px-3 py-1.5 text-sm font-semibold transition-colors",
								currentPage === totalPages || totalPages === 0
									? "pointer-events-none opacity-50 bg-muted text-muted-foreground dark:bg-zinc-800 dark:text-zinc-500"
									: "bg-white text-black hover:bg-primary-light dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-700"
							)}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		);
	};

	return (
		<section className="max-w-6xl mx-auto px-6 space-y-8">
			<Toaster
				position="top-center"
				reverseOrder={false}
				gutter={8}
				containerClassName=""
				containerStyle={{}}
				toastOptions={{
					// Define default options
					className: "",
					duration: 5000,
					removeDelay: 2000,

					// Default options for specific types
					success: {
						duration: 5000,
						iconTheme: {
							primary: "green",
							secondary: "white",
						},
					},
				}}
			/>
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
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8 items-stretch">
						{currentUsers.length > 0 ? (
							currentUsers.map((user) => (
								<UserCard
									key={user.id}
									image={user.image || "/NAB.png"}
									name={user.name}
									tags={user.tags || []}
									department={user.department || "Unknown Department"}
									userId={user.id}
									handleConnect={handleConnect}
									isLoggedIn={isAuthenticated}
									isConnected={connections.includes(user.id)}
									isRequested={sentRequest.includes(user.id)}
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
						<div className="pt-8 flex justify-center">{renderPagination()}</div>
					)}
				</>
			)}
		</section>
	);
}
