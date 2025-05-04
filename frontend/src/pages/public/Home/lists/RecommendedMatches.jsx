"use client";
import React, { useEffect } from "react";
import { useState, useMemo } from "react";
import UserCard from "@/pages/public/Home/lists/UserCard";
import GradientHeading from "@/components/Text/GradientHeading";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

export default function RecommendedMatches() {
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

			setLoading(true); // Set loading state when connecting
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
		} finally {
			setLoading(false); // Reset loading state
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
							currentUsers.map((user) => (
								<UserCard
									key={user.id}
									image={user.image || "/NAB.png"}
									name={user.username}
									tags={user.skills || []}
									department={user.department || "Unknown Department"}
									userId={user.id}
                  handleConnect={handleConnect}
                  isLoggedIn={getCookie("accessToken") !== null}
								/>
							))
						) : (
							<div className="col-span-full text-center mt-8 text-body1 font-medium text-text-light dark:text-text-dark">
								No mentors found. Try another keyword!
							</div>
						)}
					</div>

					{/* Pagination Controls */}
					{users.length > 6 && (
						<div className="flex justify-center gap-2 pt-8">
							<button
								onClick={() => paginate(currentPage - 1)}
								disabled={currentPage === 1 || loading}
								className={`px-3 py-1 rounded ${
									currentPage === 1 || loading
										? "bg-gray-200 text-gray-500 cursor-not-allowed"
										: "bg-blue-600 text-white hover:bg-blue-700"
								}`}
							>
								Prev
							</button>

							<div className="flex items-center gap-1">
								{Array.from({ length: totalPages }, (_, i) => i + 1)
									.filter((page) => {
										// Show current page and 1 page on each side
										return (
											page === 1 ||
											page === totalPages ||
											Math.abs(page - currentPage) <= 1
										);
									})
									.map((page, index, array) => (
										<React.Fragment key={`page-group-${page}`}>
											{index > 0 && array[index - 1] !== page - 1 && (
												<span key={`ellipsis-${page}`} className="px-2">
													...
												</span>
											)}
											<button
												key={page}
												onClick={() => paginate(page)}
												disabled={loading}
												className={`w-8 h-8 rounded-full flex items-center justify-center ${
													currentPage === page
														? "bg-blue-600 text-white"
														: "bg-gray-200 hover:bg-gray-300"
												} ${loading ? "cursor-not-allowed opacity-70" : ""}`}
											>
												{page}
											</button>
										</React.Fragment>
									))}
							</div>

							<button
								onClick={() => paginate(currentPage + 1)}
								disabled={
									currentPage === totalPages || totalPages === 0 || loading
								}
								className={`px-3 py-1 rounded ${
									currentPage === totalPages || totalPages === 0 || loading
										? "bg-gray-200 text-gray-500 cursor-not-allowed"
										: "bg-blue-600 text-white hover:bg-blue-700"
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
