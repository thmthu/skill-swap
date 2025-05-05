"use client";
import React, { useEffect } from "react";
import { useState, useMemo } from "react";
import UserCard from "@/pages/public/Home/lists/UserCard";
import GradientHeading from "@/components/Text/GradientHeading";
import { useAuth } from "../../../../context/AuthContext";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { cn } from "@/lib/utils";
import {
	Pagination,
	PaginationContent,
	PaginationLink,
	PaginationItem,
	PaginationPrevious,
	PaginationNext,
	PaginationEllipsis,
} from "@/components/ui/pagination";

export default function RecommendedMatches({ connections, sentRequest }) {
	const { isAuthenticated, user } = useAuth();
	const userId = user ? user._id : null;
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
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

	const getCookie = (cookieName) => {
		const cookies = document.cookie.split("; ");
		const tokenCookie = cookies.find((cookie) =>
			cookie.startsWith(`${cookieName}=`)
		);
		return tokenCookie ? tokenCookie.split("=")[1] : null;
	};

	const handleConnect = async (receiverId) => {
		try {
			const token = getCookie("accessToken");
			if (!token) throw new Error("Missing auth token");

			// setLoading(true); // Set loading state when connecting
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
			if (response.status === 200) {
				toast.success(response.data.message);
			} else {
				toast.error("Failed to send connection request");
			}
		} catch (error) {
			toast.error("Failed to send connection request");
			console.error("Error:", error.response?.data || error.message);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true); // Set loading to true before fetching
			try {
				const token = getCookie("accessToken");
				if (!token) throw new Error("Missing auth token");

				let endpoint = "http://localhost:3000/api/users/recommendations";

				const response = await axios.get(endpoint, {
					headers: { Authorization: `Bearer ${token}` },
				});
				setUsers(response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
				toast.error("Failed to fetch recommended matches");
			} finally {
				setLoading(false); // Set loading to false after fetching
			}
		};
		fetchData();
	}, []);

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
		<section className="max-w-6xl mx-auto px-6 space-y-8 mb-12">
			<Toaster
				position="top-center"
				reverseOrder={false}
				gutter={8}
				containerClassName=""
				containerStyle={{}}
				toastOptions={{
					className: "",
					duration: 5000,
					removeDelay: 2000,
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
					<GradientHeading>Your Best Matches</GradientHeading>
				</div>
			</div>

			{/* Loading State Display */}
			{loading ? (
				<div className="flex justify-center items-center py-12">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
				</div>
			) : (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
						{currentUsers.length > 0 ? (
							currentUsers.map(
								(user) =>
									user._id !== userId && (
										<UserCard
											key={user._id}
											image={user.avatar || "/NAB.png"}
											name={user.username}
											tags={user.skills || []}
											department={user.bio || "Unknown Department"}
											userId={user._id}
											handleConnect={handleConnect}
											isLoggedIn={isAuthenticated}
											isConnected={connections.includes(user._id)}
											isRequested={sentRequest.includes(user._id)}
										/>
									)
							)
						) : (
							<div className="col-span-full text-center mt-8 text-body1 font-medium text-text-light dark:text-text-dark">
								No mentors found. Try another keyword!
							</div>
						)}
					</div>

					{/* Pagination Controls */}
					{/* Pagination Controls */}
					{users.length > 6 && (
						<div className="pt-8 flex justify-center">{renderPagination()}</div>
					)}
				</>
			)}
		</section>
	);
}
