"use client";

import { Tilt } from "@/components/ui/tilt";
import { useNavigate } from "react-router-dom";
import {
	MorphingDialog,
	MorphingDialogTrigger,
	MorphingDialogContent,
	MorphingDialogTitle,
	MorphingDialogImage,
	MorphingDialogSubtitle,
	MorphingDialogClose,
	MorphingDialogDescription,
	MorphingDialogContainer,
} from "@/components/ui/morphing-dialog";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid";
import ActiveButton from "@/components/Button/ActiveButton";
import { useState } from "react";

export default function UserCard({
	image,
	name,
	tags = [],
	department,
	userId,
	handleConnect,
	isLoggedIn,
}) {
	const [isConnected, setIsConnected] = useState(false);
	const navigate = useNavigate();

	const handleChatClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		navigate("/chat", {
			state: { receiverId: userId, username: name, profilePic: image || "" },
		});
	};
	// console.log("UserId", userId);

	return (
		<Tilt rotationFactor={8} isReverse>
			<MorphingDialog
				transition={{
					type: "spring",
					bounce: 0.05,
					duration: 0.25,
				}}
			>
				<MorphingDialogTrigger
					style={{ borderRadius: "12px" }}
					className="group relative flex w-full max-w-[300px] flex-col overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-gray-800 !p-0"
				>
					{/* Image */}
					<MorphingDialogImage
						src={image}
						alt={name}
						className="h-48 w-full object-cover"
					/>

					<div className="flex flex-col grow px-4 py-5 space-y-2">
						<div className="flex items-center justify-between w-full">
							<div className="text-left space-y-1">
								<MorphingDialogTitle className="text-h2 font-semibold font-heading text-black dark:text-white">
									{name}
								</MorphingDialogTitle>
								<p className="text-sm text-zinc-600 dark:text-zinc-400">
									{department}
								</p>
							</div>

							<div
								onClick={handleChatClick}
								className="ml-4 bg-primary text-white rounded-full p-2 hover:bg-primary-dark transition cursor-pointer"
							>
								<ChatBubbleLeftEllipsisIcon className="w-5 h-5" />
							</div>
						</div>

						<div className="flex flex-wrap justify-center gap-2 pt-3">
							{tags.map((tag, index) => (
								<span
									key={index}
									className="px-3 py-0.5 rounded-full bg-secondary-light-pink text-primary text-xs font-medium"
								>
									{tag}
								</span>
							))}
						</div>
					</div>
				</MorphingDialogTrigger>

				{/* Dialog Content */}
				<MorphingDialogContainer>
					<MorphingDialogContent
						style={{ borderRadius: "24px" }}
						className="pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-gray-800 sm:w-[500px]"
					>
						<MorphingDialogImage
							src={image}
							alt={name}
							className="h-64 w-full object-cover"
						/>

						<div className="p-6">
							<div className="space-y-1">
								<MorphingDialogTitle className="text-2xl font-bold font-heading text-black dark:text-white">
									{name}
								</MorphingDialogTitle>
								<p className="text-md font-medium text-zinc-600 dark:text-zinc-400">
									{department}
								</p>
							</div>

							<MorphingDialogSubtitle className="flex flex-wrap gap-2 mt-4">
								{tags.map((tag, index) => (
									<span
										key={index}
										className="px-2 py-0.5 rounded-full bg-secondary-light-pink text-primary text-xs font-medium"
									>
										{tag}
									</span>
								))}
							</MorphingDialogSubtitle>

							<MorphingDialogDescription
								disableLayoutAnimation
								variants={{
									initial: { opacity: 0, scale: 0.8, y: 100 },
									animate: { opacity: 1, scale: 1, y: 0 },
									exit: { opacity: 0, scale: 0.8, y: 100 },
								}}
							>
								<p className="pt-2 text-body1 md:text-body1 text-zinc-600 dark:text-zinc-400 leading-relaxed">
									{department}
								</p>
								{!isLoggedIn || (
									<ActiveButton
										onClick={() => {handleConnect(userId), setIsConnected(true)}}
										children={isConnected ? "Connected" : "Connect"}
										disabled={isConnected}
										className="bg-primary text-white hover:bg-primary-dark dark:bg-primary-medium dark:text-text-light dark:hover:bg-red-300 rounded-md mt-4 px-8 py-3 "
									/>
								)}
							</MorphingDialogDescription>
						</div>

						<MorphingDialogClose className="absolute top-4 right-4 text-zinc-400 hover:text-white" />
					</MorphingDialogContent>
				</MorphingDialogContainer>
			</MorphingDialog>
		</Tilt>
	);
}
