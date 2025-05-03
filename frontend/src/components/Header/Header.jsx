import React from "react";

const Header = ({ title, description, buttonText }) => {

	return (
		<div className="w-full h-[25vh] md:h-[70vh] relative">
			{/* Mobile Version */}
			<div className="block md:hidden w-full h-full bg-[url('/header-background-mobile.jpg')] bg-cover bg-no-repeat bg-center bg-gradient-to-l from-black/0 via-black/20 to-black/40 overflow-hidden">
				<div className="w-[13rem] left-[1.125rem] top-[2.6875rem] absolute inline-flex flex-col justify-start items-start gap-[0.25rem]">
					<div className="self-stretch justify-start text-white text-2xl font-bold font-['Poppins']">
						{title}
					</div>
					<div className="self-stretch text-justify justify-start text-white text-xs font-normal font-['Poppins']">
						{description}
					</div>
				</div>
				<div
					data-property-1="Active"
					className="w-[5rem] px-[0.75rem] py-[0.375rem] left-[1.125rem] top-[9.3125rem] absolute bg-gray-50 rounded shadow-[0_0.25rem_0.25rem_0_rgba(0,0,0,0.25)] outline-[0.1rem] outline-offset-[-0.1rem] outline-red-600 inline-flex justify-center items-center gap-[0.125rem]"
				>
					<div className="justify-start text-red-800 text-xs font-semibold font-['Poppins']">
						{buttonText}
					</div>
				</div>
			</div>

			{/* Desktop Version */}
			<div className="hidden md:block w-[100vw] h-full bg-[url('/header-background-desktop.jpg')] bg-fit bg-center bg-no-repeat">
				{/* Content Container */}
				<div className="absolute top-6 left-4 md:top-[100px] md:left-[100px] w-[90%] max-w-[400px] md:max-w-[500px] px-4 py-5 md:px-8 md:py-10 bg-gray-50 rounded-xl shadow-lg flex flex-col gap-4">
					{/* Title Section */}
					<div className="flex flex-col gap-2">
						<h1 className="text-2xl md:text-4xl font-bold font-['Poppins'] text-black leading-tight">
							{title}
						</h1>
						<div className="w-20 md:w-32 h-1 bg-red-800" />
					</div>

					{/* Description Section */}
					<p className="text-xs md:text-sm font-normal font-['Poppins'] text-black leading-relaxed whitespace-pre-line">
						{description}
					</p>

					{/* Button Section */}
					<div
						data-property-1="Active"
						className="w-20 md:w-24 px-3 py-2 bg-gradient-to-b from-red-600 via-red-800 to-pink-950 rounded-md flex justify-center items-center"
					>
						<span className="text-xs md:text-sm font-semibold font-['Poppins'] text-white">
							{buttonText}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
