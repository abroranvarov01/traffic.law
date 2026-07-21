"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { Container } from "@/shared/ui/Container/Container";

export const OurWorks = ({ dict }) => {
	const t = dict?.works || {};
	const labels = t.labels || {};

	const projects = [
		{ id: "01", data: t.item1, image: "/news/work-image.png" },
		{ id: "02", data: t.item2, image: "/news/work-image.png" },
		{ id: "03", data: t.item3, image: "/news/work-image.png" },
	];

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

				{/* Projects List */}
				<div className="flex flex-col border-t border-white/10">
					{projects.map((project, index) => (
						<motion.div
							key={project.id}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-100px" }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							style={{ willChange: "opacity, transform" }}
							className="group relative border-b border-white/10 py-12 md:py-16 hover:bg-white/[0.02] transition-colors duration-500"
						>
							<div className="flex flex-col lg:flex-row gap-8 lg:gap-16 px-4">
								{/* Image & ID */}
								<div className="flex flex-row lg:flex-col gap-6 lg:w-1/4 shrink-0">
									<span className="text-4xl md:text-6xl font-serif italic text-white/10 group-hover:text-[#C59D5F] transition-colors duration-500">
										{project.id}
									</span>
									<div className="relative w-32 h-32 md:w-full md:h-48 overflow-hidden rounded-sm border border-white/5 shadow-2xl transform-gpu [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
										<Image
											src={project.image}
											alt={project.data?.title}
											fill
											className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
										/>
									</div>
								</div>

								{/* Content Grid */}
								<div className="flex-grow">
									<h3 className="text-lg md:text-2xl font-serif uppercase tracking-wide text-[#C59D5F] mb-8 group-hover:text-white transition-colors">
										{project.data?.title}
									</h3>

									<div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
										{/* Task */}
										<div className="space-y-2">
											<h4 className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
												{labels.task}
											</h4>
											<p className="text-gray-400 text-xs md:text-sm leading-relaxed">
												{project.data?.task}
											</p>
										</div>
										{/* Actions */}
										<div className="space-y-2">
											<h4 className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
												{labels.actions}
											</h4>
											<p className="text-gray-400 text-xs md:text-sm leading-relaxed">
												{project.data?.actions}
											</p>
										</div>
										{/* Result */}
										<div className="space-y-2">
											<h4 className="text-[10px] uppercase tracking-widest text-[#C59D5F] font-bold">
												{labels.result}
											</h4>
											<p className="text-white text-xs md:text-sm leading-relaxed italic">
												{project.data?.result}
											</p>
										</div>
									</div>
								</div>

								{/* Arrow Button */}
								<div className="hidden lg:flex items-center">
									<div className="w-14 h-14 bg-white/5 group-hover:bg-[#C59D5F] flex items-center justify-center rounded-full transition-all duration-500 border border-white/10">
										<FiArrowUpRight className="text-2xl text-white/40 group-hover:text-[#070707] group-hover:rotate-45 transition-all" />
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>

				{/* Premium Button */}
				<div className="flex justify-center mt-16 md:mt-24">
					<motion.button
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
					</motion.button>
				</div>
			</Container>
		</section>
	);
};
