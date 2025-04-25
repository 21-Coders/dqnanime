import { useState } from "react";
import { motion } from "framer-motion";
import type { TeamMember } from '@/data/team';

interface TeamSectionProps {
	members: TeamMember[];
}

const TeamSection: React.FC<TeamSectionProps> = ({ members }) => {
	const [hoveredMember, setHoveredMember] = useState<string | null>(null);

	return (
		<section className="py-24 bg-black text-white">
			<div className="container mx-auto px-4">
				<h2 className="text-4xl md:text-6xl font-cyber font-bold text-center mb-16">
					<span className="text-cyberred">TEAM</span> MEMBERS
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{members.map((member) => (
						<motion.div
							key={member.id}
							className="relative cursor-pointer"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							viewport={{ once: true, margin: "-100px" }}
							onMouseEnter={() => setHoveredMember(member.id)}
							onMouseLeave={() => setHoveredMember(null)}
						>
							<div className="relative overflow-hidden perspective-container">
								{/* Doctor Strange Geometric Effect - placed behind the image */}
								{hoveredMember === member.id && (
									<div className="absolute inset-0 z-1 bg-black perspective-container">
										{/* Main triangular frame */}
										<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
											<motion.svg 
												width="100%" 
												height="100%" 
												viewBox="0 0 100 120"
												className="neon-glow absolute animate-triangle-pulse" 
												style={{ 
													zIndex: 1,
													transform: 'perspective(1000px) rotateY(20deg)' 
												}}
												initial={{ opacity: 0, scale: 0.8 }}
												animate={{ opacity: 1, scale: 1 }}
												transition={{ duration: 0.4 }}
											>
												<title>Geometric Frame</title>
												<motion.polygon 
													points="50,10 90,90 10,90" 
													fill="none" 
													stroke="#FF0000" 
													strokeWidth="2"
													initial={{ pathLength: 0 }}
													animate={{ pathLength: 1 }}
													transition={{ duration: 0.8 }}
												/>
											</motion.svg>
											
											{/* Second triangle, rotated */}
											<motion.svg 
												width="100%" 
												height="100%" 
												viewBox="0 0 100 120"
												className="neon-glow absolute animate-triangle-rotate" 
												style={{ 
													zIndex: 1,
													transform: 'perspective(1000px) rotateY(-20deg)' 
												}}
												initial={{ opacity: 0 }}
												animate={{ opacity: 0.7 }}
												transition={{ duration: 0.5, delay: 0.2 }}
											>
												<title>Rotating Triangle</title>
												<motion.polygon 
													points="50,10 90,90 10,90" 
													fill="none" 
													stroke="#FF0000" 
													strokeWidth="1.5"
													initial={{ pathLength: 0 }}
													animate={{ pathLength: 1 }}
													transition={{ duration: 1 }}
												/>
											</motion.svg>
										</div>
										
										{/* Floating triangle particles */}
										<div className="absolute inset-0 overflow-hidden pointer-events-none">
											{[...Array(20)].map((_, i) => {
												const size = 3 + Math.random() * 6;
												const floatX = (Math.random() * 40) - 20;
												const floatY = (Math.random() * 40) - 20;
												const floatZ = (Math.random() * 40) - 5;
												const startX = 10 + Math.random() * 80;
												const startY = 10 + Math.random() * 80;
												
												return (
													<motion.div
														key={`triangle-${member.id}-${i}`}
														className="triangle-particle absolute animate-float-triangle"
														style={{
															left: `${startX}%`,
															top: `${startY}%`,
															borderWidth: `0 ${size}px ${size * 1.5}px ${size}px`,
															borderColor: 'transparent transparent #FF0000 transparent',
															// @ts-ignore -- CSS variables
															'--float-x': floatX,
															// @ts-ignore -- CSS variables
															'--float-y': floatY,
															// @ts-ignore -- CSS variables
															'--float-z': floatZ,
															zIndex: 1
														}}
														initial={{ opacity: 0, rotate: Math.random() * 360 }}
														animate={{ 
															opacity: 0.6 + Math.random() * 0.4,
															rotate: [Math.random() * 360, Math.random() * 360]
														}}
														transition={{
															opacity: { duration: 0.5, delay: i * 0.05 },
															rotate: { 
																duration: 3 + Math.random() * 4,
																repeat: Number.POSITIVE_INFINITY,
																repeatType: 'loop'
															}
														}}
													/>
												);
											})}
										</div>
										
										{/* Red line elements */}
										<div className="absolute inset-0 pointer-events-none">
											{[...Array(4)].map((_, i) => {
												const angle = (i * 45) + 22.5;
												const length = 80 + (i * 20);
												const thickness = 2 - (i * 0.2);
												const startPos = 40 + (i * 10);
												const translateZ = 10 + (i * 5);
												
												return (
													<motion.div
														key={`line-${member.id}-${i}`}
														className="absolute "
														style={{
															width: `${length}%`,
															height: `${thickness}px`,
															left: '50%',
															top: '50%',
															transform: `translate3d(-50%, -${startPos}%, ${translateZ}px) rotate(${angle}deg)`,
															transformOrigin: 'center left',
															opacity: 0.8 - (i * 0.15),
															zIndex: 1
														}}
														initial={{ scaleX: 0 }}
														animate={{ scaleX: 1 }}
														transition={{ 
															duration: 0.6, 
															delay: 0.1 + (i * 0.1) 
														}}
													/>
												);
											})}
										</div>
									</div>
								)}
								
								{/* Image */}
								<div className="aspect-w-3 aspect-h-4 relative z-2">
									<img 
										src={member.imageUrl} 
										alt={member.name} 
										className={`w-full h-full object-cover transition-all duration-500 relative ${hoveredMember === member.id ? 'grayscale-0 scale-105' : 'grayscale'}`}
										style={{ 
											transitionTimingFunction: hoveredMember === member.id ? 'cubic-bezier(0.2, 0.8, 0.2, 1)' : 'ease',
											zIndex: 2
										}}
									/>
								</div>
								
								{/* Colored border on hover */}
								{hoveredMember === member.id && (
									<motion.div 
										className="absolute inset-0 border-2 red-border"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ duration: 0.2 }}
										style={{ zIndex: 3 }}
									/>
								)}
								
								{/* Scan line animation on hover */}
								{hoveredMember === member.id && (
									<motion.div 
										className="absolute top-0 left-0 w-full h-6 bg-deep-red/20"
										initial={{ y: -10 }}
										animate={{ y: 400 }}
										transition={{
											duration: 2,
											repeat: Number.POSITIVE_INFINITY,
											ease: "linear",
											repeatType: "loop"
										}}
										style={{ zIndex: 5 }}
									/>
								)}
								
								{/* Corner brackets */}
								<div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-deep-red z-10 red-border" />
								<div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-deep-red z-10 red-border" />
								<div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-deep-red z-10 red-border" />
								<div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-deep-red z-10 red-border" />
							</div>

							{/* Member info */}
							<div className="bg-cyberdark2 p-4">
								<div className="text-center">
									<motion.h3 
										className={`text-4xl font-cyber mb-1 ${hoveredMember === member.id ? 'text-deep-red' : 'text-white'}`}
										animate={{ color: hoveredMember === member.id ? '#FF0000' : '#ffffff' }}
										transition={{ duration: 0.3 }}
									>
										{member.number}
									</motion.h3>
									<h4 className="text-lg font-cyber text-white">
										{member.name}
									</h4>
									<p className="text-sm font-code text-gray-400 mt-2">
										{member.role}
									</p>

									{/* Social media icon */}
									<div className="mt-3">
										<svg
											className="w-6 h-6 mx-auto text-white"
											xmlns="http://www.w3.org/2000/svg"
											fill="currentColor"
											viewBox="0 0 24 24"
											aria-hidden="true"
										>
											<title>X/Twitter</title>
											<path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
										</svg>
									</div>
									
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default TeamSection;
