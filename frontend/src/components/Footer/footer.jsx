import React from "react";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";

export default function Footer() {
	return (
		<footer className="w-full bg-black flex flex-col justify-end items-center relative pt-8 pb-4 mt-8">
			{/* Main content */}
			<div className="w-[90%] max-w-[90rem] mx-auto py-1 px-2 md:px-3 lg:px-4">
				{/* Desktop layout */}
				<div className="hidden md:flex md:flex-row justify-center items-start gap-2 md:gap-3 py-2">
					{/* About Us Section */}
					<div className="flex-1 flex flex-col gap-0.75">
						<h3 className="text-gray-200 text-2xl md:text-3xl font-bold font-poppins">
							About Us
						</h3>
						<p className="text-gray-200 text-md md:text-base font-normal font-poppins max-w-[20rem] text-justify">
							SkillSwap connects NAB colleagues to share knowledge and develop
							skills. Find learning partners, grow professionally, and build
							valuable connections within our community.
						</p>
						<div className="mt-1 flex items-center gap-0.75">
							<div className="relative">
								<img
									className="w-12 h-12 md:w-32 md:h-32 object-cover"
									src="/web-logo.jpg"
									alt="NAB Logo"
								/>
							</div>
						</div>
					</div>

					{/* Quick Links Section */}
					<div className="flex-1 flex flex-col gap-0.75">
						<h3 className="text-gray-200 text-2xl md:text-3xl font-bold font-poppins">
							Quick Links
						</h3>
						<div className="flex flex-col gap-0.5">
							<a
								href="/"
								className="text-gray-200 text-md md:text-base font-normal font-poppins hover:text-red-500 transition-colors"
							>
								Home
							</a>
							<a
								href="/profile"
								className="text-gray-200 text-md md:text-base font-normal font-poppins hover:text-red-500 transition-colors"
							>
								My Request
							</a>
							<a
								href="/resources"
								className="text-gray-200 text-md md:text-base font-normal font-poppins hover:text-red-500 transition-colors"
							>
								Resources
							</a>
						</div>
					</div>

					{/* Contact Info Section */}
					<div className="flex-1 flex flex-col gap-0.75">
						<h3 className="text-gray-200 text-2xl md:text-3xl font-bold font-poppins">
							Contact Info
						</h3>
						<div className="flex flex-col gap-0.5">
							<div className="flex items-center gap-2.5">
								<EnvelopeIcon className="text-white w-[1.5rem]" />
								<a
									href="mailto:wecampteam.nab@gmail.com"
									className="text-gray-200 text-md md:text-base font-normal font-poppins hover:text-red-500 transition-colors"
								>
									wecampteam.nab@gmail.com
								</a>
							</div>
							<div className="flex items-center gap-2.5">
								<PhoneIcon className="text-white w-[1.5rem]" />
								<a
									href="tel:+84919999999"
									className="text-gray-200 text-md md:text-base font-normal font-poppins hover:text-red-500 transition-colors"
								>
									(+84) 919 999 999 (Ms. Diem Pham)
								</a>
							</div>
						</div>
					</div>
				</div>

				{/* Mobile layout */}
				<div className="flex flex-col md:hidden justify-end items-center gap-2.5">
					<div className="w-full flex flex-col justify-end items-center">
						{/* Logo and About Us section */}
						<div className="self-stretch py-3 flex flex-col justify-start items-center gap-2 overflow-hidden">
							<div className="w-28 h-32 relative">
								<div className="w-28 h-28 left-[0.60px] top-0 absolute">
									<img
										className="w-32 h-32 mx-auto mt-3.5 object-fit"
										src="/web-logo.jpg"
										alt="NAB Logo"
									/>
								</div>
							</div>
							<div className="w-full h-36 relative">
								<p className="w-[90%] mx-auto mt-8 text-gray-200 text-md font-normal font-poppins text-justify">
									SkillSwap connects NAB colleagues to share knowledge and
									develop skills. Find learning partners, grow professionally,
									and build valuable connections within our community.
								</p>
							</div>
						</div>

						{/* Quick Links section */}
						<div className="self-stretch py-3 flex flex-col justify-start items-center gap-2.5 overflow-hidden">
							<h3 className="self-stretch text-center text-gray-200 text-2xl font-bold font-poppins">
								Quick Links
							</h3>
							<a
								href="/"
								className="self-stretch text-center text-gray-200 text-md font-medium font-poppins hover:text-red-500 transition-colors"
							>
								Home
							</a>
							<a
								href="/profile"
								className="text-center text-gray-200 text-md font-medium font-poppins hover:text-red-500 transition-colors"
							>
								My Request
							</a>
							<a
								href="/resources"
								className="text-center text-gray-200 text-md font-medium font-poppins hover:text-red-500 transition-colors"
							>
								Resources
							</a>
						</div>

						{/* Contact Info section */}
						<div className="self-stretch py-3 flex flex-col justify-start items-center gap-2.5 overflow-hidden">
							<h3 className="self-stretch text-center text-gray-200 text-2xl font-bold font-poppins">
								Contact Info
							</h3>
							<div className="flex flex-col justify-start items-center gap-3">
								<div className="w-72 flex flex-col justify-center items-center gap-1.5">
									<EnvelopeIcon className="w-6 h-6 text-white" />
									<a
										href="mailto:wecampteam.nab@gmail.com"
										className="text-gray-200 text-base font-normal font-poppins hover:text-red-500 transition-colors"
									>
										wecampteam.nab@gmail.com
									</a>
								</div>
								<div className="flex flex-col justify-center items-center gap-1.5">
									<PhoneIcon className="w-6 h-6 text-white" />
									<a
										href="tel:+84919999999"
										className="text-gray-200 text-base font-normal font-poppins hover:text-red-500 transition-colors"
									>
										(+84) 919 999 999 (Ms. Diem Pham)
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Copyright - shared between mobile and desktop */}
			<div className="w-full py-1 bg-black flex flex-col justify-center items-center gap-2.5 pb-2.5">
				<span className="inline-block w-[90%] h-[2px] bg-primary mx-auto mb-2"></span>
				<div className="text-center flex flex-col md:block">
					<span className="text-gray-200 text-md md:text-base font-normal font-poppins tracking-tight">
						Copyright ©2025 All rights reserved
					</span>
					<div className="md:inline">
						<span className="text-gray-200 text-md md:text-base font-normal font-poppins tracking-tight md:ml-1">
							Designed and built by
						</span>
						<span className="text-red-600 text-md md:text-base font-normal font-poppins ml-0.25">
							Team WeCamp
						</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
