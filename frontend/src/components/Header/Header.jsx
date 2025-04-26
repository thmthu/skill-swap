import React from "react";

const Header = () => {
	const headerData = {
		"my-network": {
			title: "My Network",
			description:
				"Expand your network to level up your skills or go beyond your comfort zone. \n At NAB, we always encourage new discovery and support from our beloved colleagues.",
			buttonText: "Discover",
		},
	};
	return (
		<div className="w-full h-[50vh] relative bg-[url(../../../public/header-background.jpg)] bg-gradient-to-l from-black/5 via-black/25 to-black/25 overflow-hidden">
			<div className="w-[495px] px-10 py-8 left-[120px] top-[113px] absolute bg-gray-50 rounded-2xl inline-flex flex-col justify-start items-start gap-4">
				<div className="self-stretch flex flex-col justify-start items-start">
					<div className="self-stretch justify-start text-black text-5xl font-bold font-['Poppins']">
						{headerData["my-network"].title}
					</div>
					<div className="w-36 h-1.5 bg-red-800" />
				</div>
				<div className="self-stretch text-justify justify-start text-black text-base font-normal font-['Poppins']">
					{headerData["my-network"].description}
				</div>
				<div
					data-property-1="Active"
					className="w-28 px-4 py-2 bg-gradient-to-b from-red-600 via-red-800 to-pink-950 rounded-md inline-flex justify-center items-center gap-2.5"
				>
					<div className="justify-start text-white text-base font-semibold font-['Poppins']">
						{headerData["my-network"].buttonText}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
