import { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from "wouter";
import {
	motion,
	useScroll,
	useTransform,
	AnimatePresence,
} from "framer-motion";

const navItems = [
	{ label: "HOME", japaneseLabel: "ホーム", href: "/" },
	{ label: "CHARACTERS", japaneseLabel: "キャラクター", href: "/characters" },
	{ label: "WORLD", japaneseLabel: "ワールド", href: "/world" },
	{ label: "COMMUNITY", japaneseLabel: "コミュニティ", href: "/community" },
];

interface NavItemProps {
	label: string;
	japaneseLabel: string;
	href: string;
	isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
	label,
	japaneseLabel,
	href,
	isActive,
}) => {
	const [isHovered, setIsHovered] = useState(false);
	const [glitchEffect, setGlitchEffect] = useState(false);
	const [japaneseChars, setJapaneseChars] = useState<string[]>([]);
	const originalText = useRef<string>(japaneseLabel);

	// Japanese character pool for glitch effect
	const japaneseCharPool =
		"アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン";

	useEffect(() => {
		setJapaneseChars(originalText.current.split(""));
	}, [japaneseLabel]);

	// Handle hover states with glitch effect
	const handleMouseEnter = () => {
		setGlitchEffect(true);

		setTimeout(() => {
			setIsHovered(true);
			setGlitchEffect(false);
		}, 200);
	};

	const handleMouseLeave = () => {
		setGlitchEffect(true);

		setTimeout(() => {
			setIsHovered(false);
			setGlitchEffect(false);
		}, 200);
	};

	// Generate glitching characters
	useEffect(() => {
		let interval: NodeJS.Timeout | null = null;

		if (glitchEffect) {
			// Create a local copy of characters to mutate without triggering re-renders
			const origChars = originalText.current.split("");

			interval = setInterval(() => {
				const newChars = [...origChars];

				// Randomly replace characters
				for (let i = 0; i < Math.ceil(origChars.length / 3); i++) {
					const randomIndex = Math.floor(Math.random() * origChars.length);
					newChars[randomIndex] = japaneseCharPool.charAt(
						Math.floor(Math.random() * japaneseCharPool.length),
					);
				}

				setJapaneseChars(newChars);
			}, 50);
		}

		return () => {
			if (interval) {
				clearInterval(interval);
			}

			// Reset to original after glitch effect
			if (!isHovered && !glitchEffect) {
				setJapaneseChars(originalText.current.split(""));
			}
		};
	}, [glitchEffect, isHovered]);

	return (
		<li className="relative">
			<Link href={href}>
				<a
					className={`block font-cyber text-lg uppercase tracking-wide px-3 py-2 relative overflow-hidden ${isActive ? "text-cyberred" : "text-white"}`}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<AnimatePresence initial={false} mode="wait">
						{isHovered ? (
							<motion.div
								key="japanese"
								className="flex justify-center items-center space-x-1 font-jp"
								initial={{ y: 10, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								exit={{ y: -10, opacity: 0 }}
								transition={{ duration: 0.2 }}
							>
								{japaneseChars.map((char, idx) => (
									<motion.span
										key={`${idx}-${char}`}
										initial={{ y: 0 }}
										animate={{
											y: glitchEffect ? [0, -2, 1, 0] : 0,
											opacity: glitchEffect ? [1, 0.7, 1] : 1,
											color: glitchEffect
												? ["#ffffff", "#FF2D55", "#00F0FF", "#ffffff"]
												: isActive
													? "#FF2D55"
													: "#ffffff",
										}}
										transition={{ duration: 0.2 }}
									>
										{char}
									</motion.span>
								))}
							</motion.div>
						) : (
							<motion.div
								key="english"
								className="flex justify-center items-center"
								initial={{ y: -10, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								exit={{ y: 10, opacity: 0 }}
								transition={{ duration: 0.2 }}
							>
								{label}
							</motion.div>
						)}
					</AnimatePresence>

					{/* Active indicator */}
					{isActive && (
						<motion.div
							className="absolute bottom-0 left-0 w-full h-[2px] bg-cyberred"
							initial={{ scaleX: 0 }}
							animate={{ scaleX: 1 }}
							layoutId="activeNavIndicator"
							transition={{ type: "spring", stiffness: 400, damping: 30 }}
						/>
					)}

					{/* Hover scan effect */}
					<motion.div
						className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-cyberred/10 to-transparent"
						initial={{ opacity: 0, x: "-100%" }}
						animate={{
							opacity: isHovered ? [0, 0.7, 0] : 0,
							x: isHovered ? ["-100%", "100%"] : "-100%",
						}}
						transition={{ duration: 0.5 }}
					/>
				</a>
			</Link>
		</li>
	);
};

const LogoText: React.FC = () => {
	const [isHovered, setIsHovered] = useState(false);
	const [isGlitching, setIsGlitching] = useState(false);

	const handleMouseEnter = () => {
		setIsGlitching(true);
		setTimeout(() => setIsHovered(true), 300);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
		setIsGlitching(false);
	};

	return (
		<motion.div
			className="relative cursor-pointer"
			whileHover={{ scale: 1.05 }}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<h1 className="text-3xl md:text-4xl font-bold font-cyber tracking-wider relative">
				<span className="inline-block">
					<span className="relative z-10">
						<img
							src="/assets/logo white on black.png"
							alt="logo"
							width={100}
							height={100}
							className="w-20 h-auto"
						/>
					</span>

					{/* Hover glow effect */}
					<motion.span
						className="absolute top-0 left-0 w-full h-full bg-cyberred opacity-20 blur-md -z-10"
						animate={{
							opacity: isHovered ? [0.2, 0.4, 0.2] : 0.2,
							scale: isHovered ? [1, 1.1, 1] : 1,
						}}
						transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
					/>
				</span>
			</h1>

			{/* Japanese text overlay - only shows during hover */}
			{/* {isHovered && (
				<motion.div
					className="absolute -top-5 left-0 w-full font-jp text-sm text-cyberred opacity-70"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 0.7, y: 0 }}
					exit={{ opacity: 0, y: 10 }}
				>
					サイバーノマド
				</motion.div>
			)} */}

			{/* Glitch effect */}
			<motion.div
				className="absolute inset-0 bg-cyberred/5 mix-blend-screen z-20 pointer-events-none"
				initial={{ opacity: 0 }}
				animate={{
					opacity: isGlitching ? [0, 0.8, 0] : 0,
					x: isGlitching ? [-5, 5, 0] : 0,
					y: isGlitching ? [3, -3, 0] : 0,
				}}
				transition={{ duration: 0.3 }}
			/>
		</motion.div>
	);
};

const Header: React.FC = () => {
	const [location] = useLocation();
	const { scrollY } = useScroll();

	// Transform scrollY to opacity and y position values
	const headerOpacity = useTransform(scrollY, [0, 100], [0, 1]);
	const headerY = useTransform(scrollY, [0, 100], [-100, 0]);

	return (
		<motion.header
			className="fixed top-0 left-0 right-0 py-6 px-4 md:px-8 lg:px-16 border-b border-cybergray z-50 bg-cyberdark/90 backdrop-blur-sm"
			style={{
				opacity: headerOpacity,
				y: headerY,
			}}
			transition={{ duration: 0.3 }}
		>
			<div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
				<div className="flex items-center mb-4 md:mb-0">
					<LogoText />
					{/* <span className="text-xs text-cyberblue ml-2 font-code">v0.9.2</span> */}
				</div>

				<nav className="w-full md:w-auto">
					<ul className="flex flex-wrap justify-center md:justify-end gap-4 lg:gap-8">
						{navItems.map((item, index) => (
							<motion.div
								key={item.label}
								initial={{ y: -20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.1 * index, duration: 0.5 }}
							>
								<NavItem {...item} isActive={location === item.href} />
							</motion.div>
						))}
					</ul>
				</nav>
			</div>

			{/* Header scan line effect */}
			<motion.div
				className="absolute bottom-0 left-0 w-full h-[1px] bg-cyberred/20"
				initial={{ scaleX: 0 }}
				animate={{ scaleX: 1 }}
				transition={{ duration: 1.5, delay: 0.8 }}
			/>
		</motion.header>
	);
};

export default Header;
