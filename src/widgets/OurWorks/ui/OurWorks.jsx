"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiChevronDown } from "react-icons/fi";
import { Container } from "@/shared/ui/Container/Container";
import Link from "next/link";

const MotionLink = motion(Link);

export const OurWorks = ({ dict, lang }) => {
	const t = dict?.works || {};
	// Keyslar bitta manbadan olinadi — /case sahifasi bilan bir xil
	const cs = dict?.case_studies || {};
	const labels = cs.labels || {};

	const projects = (cs.items || []).slice(0, 3).map((data, i) => ({
		id: String(i + 1).padStart(2, "0"),
		data,
		image: "/news/work-image.png",
	}));

	const [active, setActive] = useState(0);
	// Hover yo'q qurilmalarda (telefon/planshet) kartalar bosish orqali ochiladi
	const [isTouch, setIsTouch] = useState(false);

	useEffect(() => {
		const mq = window.matchMedia("(hover: none), (max-width: 767px)");
		const update = () => setIsTouch(mq.matches);
		update();
		mq.addEventListener("change", update);
		return () => mq.removeEventListener("change", update);
	}, []);

	// Desktopda hover ochadi, mobilda bosish ochadi va yopadi
	const handleHover = (index) => {
		if (!isTouch) setActive(index);
	};
	const handleToggle = (index) => {
		setActive((cur) => (isTouch && cur === index ? -1 : index));
	};

	const caseHref = lang ? `/${lang}/case` : "/case";
	const readMore = cs.read_more;

	// Bitta umumiy egri chiziq: tez boshlanadi, yumshoq to'xtaydi
	const EASE = [0.22, 1, 0.36, 1];
	const DURATION = 0.75;

	// Ochilganda kontent balandlik ortidan ergashadi, yopilganda darhol so'nadi
	const reveal = (isOpen) => ({
		duration: DURATION,
		ease: EASE,
		opacity: {
			duration: isOpen ? 0.4 : 0.18,
			delay: isOpen ? 0.24 : 0,
			ease: "linear",
		},
	});

	return (
		<section className="bg-[#070707] py-16 md:py-28 text-white overflow-hidden">
			<Container>
				{/* Header */}
				<div className="text-center mb-16 md:mb-24 px-4">
					<motion.span
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						className="text-[#C59D5F] text-[10px] md:text-[11px] font-bold tracking-[0.4em] uppercase block mb-6"
					>
						• {t.subtitle} •
					</motion.span>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						className="text-xl md:text-3xl lg:text-4xl font-serif uppercase tracking-wider max-w-4xl mx-auto leading-tight italic"
					>
						{t.title}
					</motion.h2>
				</div>

				{/* Projects Accordion */}
				<div className="flex flex-col">
					{projects.map((project, index) => {
						const isOpen = active === index;

						return (
							<motion.div
								key={project.id}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-100px" }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								style={{ willChange: "opacity, transform" }}
								onMouseEnter={() => handleHover(index)}
								onFocus={() => handleHover(index)}
								onClick={() => handleToggle(index)}
								role={isTouch ? "button" : undefined}
								tabIndex={isTouch ? 0 : undefined}
								aria-expanded={isTouch ? isOpen : undefined}
								onKeyDown={(e) => {
									if (isTouch && (e.key === "Enter" || e.key === " ")) {
										e.preventDefault();
										handleToggle(index);
									}
								}}
								className={`group relative cursor-pointer overflow-hidden rounded-xl border-b border-white/10 transition-colors duration-500 md:cursor-default md:border-b-0
								`}
							>
								{/* Faol karta uchun iliq yorug'lik */}
								{/* <div
									className={`pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(197,157,95,0.14),transparent_55%)] transition-opacity duration-700 ${
										isOpen ? "opacity-100" : "opacity-0"
									}`}
								/> */}

								<div
									className={`relative flex gap-4 px-4 py-5 md:items-center md:gap-8 md:px-6 md:py-6 ${
										isOpen ? "items-start" : "items-center"
									}`}
								>
									{/* Rasm — faqat ochiq holatda */}
									<motion.div
										initial={{ width: 0, opacity: 0 }}
										animate={{
											width: isOpen ? 132 : 0,
											opacity: isOpen ? 1 : 0,
										}}
										transition={reveal(isOpen)}
										className="hidden md:block shrink-0 overflow-hidden"
									>
										<motion.div
											initial={{ x: -24 }}
											animate={{ x: isOpen ? 0 : -24 }}
											transition={{ duration: DURATION, ease: EASE }}
											className="relative h-[72px] w-[132px] overflow-hidden rounded-md border border-white/10 shadow-2xl"
										>
											<Image
												src={project.image}
												alt={project.data?.title || ""}
												fill
												sizes="132px"
												className="object-cover"
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
										</motion.div>
									</motion.div>

									{/* Raqam */}
									<span
										className={`shrink-0 text-3xl font-serif italic leading-none transition-colors duration-700 ease-out md:text-5xl ${
											isOpen ? "text-[#C59D5F]" : "text-white/15"
										}`}
									>
										{project.id}
									</span>

									{/* Matn */}
									<div className="min-w-0 flex-grow">
										<h3
											className={`text-sm md:text-base font-semibold leading-snug transition-colors duration-700 ease-out ${
												isOpen ? "text-white" : "text-white/80"
											}`}
										>
											{project.data?.title}
										</h3>

										<motion.div
											initial={{ height: 0, opacity: 0 }}
											animate={{
												height: isOpen ? "auto" : 0,
												opacity: isOpen ? 1 : 0,
											}}
											transition={reveal(isOpen)}
											className="overflow-hidden"
											aria-hidden={!isOpen}
										>
											{/* Mobil uchun rasm — panel ichida, to'liq kenglikda */}
											<div className="relative mt-4 h-40 w-full overflow-hidden rounded-lg border border-white/10 md:hidden">
												<Image
													src={project.image}
													alt={project.data?.title || ""}
													fill
													sizes="100vw"
													className="object-cover"
												/>
												<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
											</div>

											<div className="mt-4 max-w-3xl space-y-1.5">
												<h4 className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/40">
													{labels.situation}
												</h4>
												<p className="text-[12px] md:text-[13px] font-light leading-relaxed text-gray-400">
													{project.data?.situation}
												</p>
											</div>

											<div className="mt-4 grid max-w-3xl grid-cols-1 gap-4 border-t border-white/10 pt-4 sm:grid-cols-2">
												<div className="space-y-1.5">
													<h4 className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/40">
														{labels.solution}
													</h4>
													<p className="text-[12px] font-light leading-relaxed text-gray-400">
														{project.data?.solution}
													</p>
												</div>
												<div className="space-y-1.5">
													<h4 className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#C59D5F]">
														{labels.result}
													</h4>
													<p className="text-[12px] font-light italic leading-relaxed text-white">
														{project.data?.result}
													</p>
												</div>
											</div>

											{/* Mobilda strelka ochish tugmasi bo'lgani uchun
												havola panel ichida turadi */}
											<Link
												href={caseHref}
												onClick={(e) => e.stopPropagation()}
												tabIndex={isOpen ? undefined : -1}
												className={`mt-5 items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#C59D5F] ${
												isTouch ? "inline-flex" : "hidden"
											}`}
											>
												{readMore}
												<FiArrowUpRight className="text-base" />
											</Link>
										</motion.div>
									</div>

									{/* O'ng tomondagi tugma: mobilda ochish-yopish, desktopda havola */}
									{isTouch ? (
										<div
											aria-hidden="true"
											className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-colors duration-700 ease-out ${
												isOpen
													? "border-transparent bg-gradient-to-b from-[#F3D393] to-[#B68541] text-[#2D1F16]"
													: "border-white/10 bg-white/5 text-white/60"
											}`}
										>
											<motion.span
												initial={false}
												animate={{ rotate: isOpen ? 180 : 0 }}
												transition={{ duration: DURATION, ease: EASE }}
												className="flex"
											>
												<FiChevronDown className="text-lg" />
											</motion.span>
										</div>
									) : (
										<Link
											href={caseHref}
											aria-label={project.data?.title}
											className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-colors duration-700 ease-out md:h-12 md:w-12 ${
												isOpen
													? "border-transparent bg-gradient-to-b from-[#F3D393] to-[#B68541] text-[#2D1F16]"
													: "border-white/10 bg-white/5 text-white/60 hover:text-white"
											}`}
										>
											<FiArrowUpRight className="text-lg md:text-xl" />
										</Link>
									)}
								</div>
							</motion.div>
						);
					})}
				</div>

				{/* Premium Button */}
				<div className="flex justify-center mt-16 md:mt-24">
					<MotionLink
						href={caseHref}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="relative group overflow-hidden px-12 py-5 rounded-lg transition-all duration-300"
						style={{
							background:
								"linear-gradient(180deg, #F3D393 0%, #D4A762 50%, #B68541 100%)",
							boxShadow: "0px 10px 30px rgba(197, 157, 95, 0.3)",
						}}
					>
						<div className="relative z-10 flex items-center gap-4 text-[#2D1F16] font-black uppercase tracking-[0.3em] text-[11px]">
							<div className="w-1.5 h-1.5 bg-[#2D1F16] rotate-45" />
							{t.view_all_btn}
							<div className="w-1.5 h-1.5 bg-[#2D1F16] rotate-45" />
						</div>
						<div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
					</MotionLink>
				</div>
			</Container>
		</section>
	);
};
