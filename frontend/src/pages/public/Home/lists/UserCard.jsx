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

export default function UserCard({
	image,
	name,
	tags = [],
	department,
	userId,
	handleConnect,
	isLoggedIn,
}) {
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
					className="group relative flex w-full max-w-[300px] h-full flex-col overflow-hidden shadow-md dark:shadow-lg bg-bg-light dark:bg-bg-dark !p-0 "
				>
					{/* Image */}
					<MorphingDialogImage
						src={image}
						alt={name}
						className="h-48 w-full object-cover"
					/>

					<div className="flex flex-col grow px-4 py-5 space-y-2 h-full">
						{/* Name + Department + Chat Icon in one row */}
						<div className="flex items-center justify-between w-full">
							<div className="text-left space-y-1">
								<MorphingDialogTitle className="truncate text-h2 font-semibold font-heading text-text-light dark:text-text-dark">
									{name}
								</MorphingDialogTitle>
								<p className="text-sm text-muted-foreground dark:text-primary-medium">
									{department}
								</p>
							</div>

							{/* Chat Icon */}
							<div
								onClick={handleChatClick}
								className="ml-4 bg-primary text-white rounded-full p-2 hover:bg-primary-dark transition cursor-pointer dark:text-bg-dark dark:bg-primary-medium dark:hover:bg-primary-extra-light 
             shadow-md"
							>
								<ChatBubbleLeftEllipsisIcon className="w-5 h-5" />
							</div>
						</div>

						{/* Tags */}
						<div className="flex flex-wrap justify-center gap-2 pt-3">
							{tags.map((tag, index) => (
								<span
									key={index}
									className=" truncate px-3 py-0.5 rounded-full bg-secondary-light-pink text-primary text-xs font-medium dark:bg-primary-light dark:text-primary-dark"
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
						className="pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden  bg-bg-light dark:border-zinc-50/10 dark:bg-bg-dark sm:w-[500px]"
					>
						<MorphingDialogImage
							src={image}
							alt={name}
							className="h-64 w-full object-cover"
						/>

						<div className="p-6">
							<div className="space-y-1">
								<MorphingDialogTitle className="text-2xl font-bold font-heading text-text-light dark:text-text-dark">
									{name}
								</MorphingDialogTitle>
								<p className="text-md font-medium text-muted-foreground dark:text-primary-medium ">
									{department}
								</p>
							</div>

							<MorphingDialogSubtitle className="flex flex-wrap gap-2 mt-4">
								{tags.map((tag, index) => (
									<span
										key={index}
										className="px-2 py-0.5 rounded-full bg-secondary-light-pink text-primary text-xs font-medium dark:bg-primary-light dark:text-primary-dark"
									>
										{tag}
									</span>
								))}
							</MorphingDialogSubtitle>

							<div className="mt-2 flex justify-center">
								{!isLoggedIn || (
									<ActiveButton
										onClick={() => handleConnect(userId)}
										children="Connect"
										className="bg-primary text-white hover:bg-primary-dark dark:bg-primary-medium dark:text-text-light dark:hover:bg-red-300 rounded-md mt-4 px-8 py-3 "
									/>
								)}
							</div>
						</div>

						<MorphingDialogClose className="absolute top-4 right-4 text-zinc-400 hover:text-text-light" />
					</MorphingDialogContent>
				</MorphingDialogContainer>
			</MorphingDialog>
		</Tilt>
	);
}
