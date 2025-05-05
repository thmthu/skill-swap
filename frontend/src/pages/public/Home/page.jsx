import HeroSection from "./sections/hero";
import HowItWorks from "./sections/how-it-works";
import WhyChoose from "./sections/why-choose";
import FAQ from "./sections/faq";
import Footer from "../../../components/Footer/footer";

import UserCardList from "./lists/UserCardList";
import RecommendedMatches from "./lists/RecommendedMatches";

import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HomePage() {
	const { isAuthenticated } = useAuth();

	const [connections, setConnections] = useState([]);
	const [sentRequest, setSentRequest] = useState([]);

	const getCookie = (cookieName) => {
		const cookies = document.cookie.split("; ");
		const tokenCookie = cookies.find((cookie) =>
			cookie.startsWith(`${cookieName}=`)
		);
		return tokenCookie ? tokenCookie.split("=")[1] : null;
	};

	useEffect(() => {
		try {
			const fetchConnections = async () => {
				if (isAuthenticated) {
					const token = getCookie("accessToken");
					let endpoint = "/api/connections/";
					const response = await axios.get(endpoint, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});
					if (response && response.data.length > 0) {
						setConnections(response.data.map((data) => data._id));
						console.log(response.data);
					}
				}
			};
			fetchConnections();
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		try {
			const fetchSentRequest = async () => {
				if (isAuthenticated) {
					const token = getCookie("accessToken");
					let endpoint = "/api/connections/sent";
					const response = await axios.get(endpoint, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});
					if (response && response.data.length > 0) {
						setSentRequest(response.data.map((data) => data._id));
						console.log(response.data);
					}
				}
			};
			fetchSentRequest();
		} catch (error) {
			console.log(error);
		}
	}, []);
	// const mockUsers = [
	//   {
	//     id: 1,
	//     image: "/NAB.png",
	//     name: "Jenny Tran",
	//     tags: ["Product", "Management", "Digital"],
	//     description:
	//       "Jenny is a Senior Product Manager at NAB, passionate about internal mobility and digital innovation. She enjoys mentoring emerging leaders in the tech space.",
	//   },
	//   {
	//     id: 2,
	//     image: "/NAB.png",
	//     name: "David Nguyen",
	//     tags: ["Engineering", "Cloud", "DevOps"],
	//     description:
	//       "David leads cloud infrastructure projects at NAB. He mentors engineers on scalable architecture and efficient DevOps practices.",
	//   },
	//   {
	//     id: 3,
	//     image: "/NAB.png",
	//     name: "Sarah Lee",
	//     tags: ["UX/UI", "Accessibility", "Research"],
	//     description:
	//       "Sarah specializes in user experience and inclusive design. She's passionate about helping teams build accessible and user-centered products.",
	//   },
	//   {
	//     id: 4,
	//     image: "/NAB.png",
	//     name: "Michael Pham",
	//     tags: ["Data", "Analytics", "Strategy"],
	//     description:
	//       "Michael mentors on data analytics, storytelling with data, and strategic decision-making using insights derived from large datasets.",
	//   },
	//   {
	//     id: 5,
	//     image: "/NAB.png",
	//     name: "Anna Vu",
	//     tags: ["Leadership", "Growth", "Learning & Development"],
	//     description:
	//       "Anna is an L&D specialist passionate about helping individuals grow their leadership capabilities through structured mentorship programs.",
	//   },
	// ];

	return (
		<>
			<div className="min-h-screen bg-background dark:bg-black">
				<HeroSection />
				{isAuthenticated && <RecommendedMatches />}
				<UserCardList connections={connections} sentRequest={sentRequest} />
				<WhyChoose />
				<HowItWorks />
				<FAQ />
				<Footer />
			</div>
		</>
	);
}
