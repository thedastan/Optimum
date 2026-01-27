import { PAGE } from "@/config/pages/public-page.config";
import Link from "next/link";
import React from "react";
import { BsCart3 } from "react-icons/bs";
import { GoHome } from "react-icons/go";
import { LuUserRound } from "react-icons/lu";

const MobileBottomNav = () => {
	return (
		<div className="flex md:hidden  bg-white p-3 z-50 justify-between border-t  sticky bottom-0 left-0">
			<button className="flex justify-center items-center rounded-[8px] !text-[20px] w-[40px] h-[40px]">
				<Link href={PAGE.HOME}>
					<GoHome />
				</Link>
			</button>
			<button className="flex justify-center items-center rounded-[8px] !text-[20px] w-[40px] h-[40px]">
				<Link href={PAGE.BASKET}>
					<BsCart3 />
				</Link>
			</button>
			<button className="flex justify-center items-center rounded-[8px] !text-[20px] w-[40px] h-[40px]">
				<Link href={PAGE.PROFILE}>
					<LuUserRound />
				</Link>
			</button>
		</div>
	);
};

export default MobileBottomNav;
