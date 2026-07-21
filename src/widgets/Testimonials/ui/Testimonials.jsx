"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/shared/ui/Container/Container";
import { GoldButton } from "@/shared/ui/GoldButton/GoldButton";
import { FaStar } from "react-icons/fa";

export const Testimonials = ({ dict }) => {
	const t = dict?.testimonials || {};
	const items = t.items || [];

	return (
		<section className="relative bg-[#070707] py-4 md:py-20 overflow-hidden text-white">
			{/* 1. Chap tarafdagi dekorativ rasm - OZOD VA ANIMATSIYALI */}
			<motion.div
				initial={{ x: -100, opacity: 0, rotate: -10 }}
				whileInView={{ x: 0, opacity: 1, rotate: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 1, ease: "easeOut" }}
				className="absolute -bottom-10 -left-16 w-48 h-48 md:w-72 md:h-72 lg:w-80 lg:h-80 z-20 pointer-events-none hidden sm:block"
			>
				<Image
					src="/news/user.png"
					alt="Decoration Left"
					fill
					className="object-contain"
				/>
			</motion.div>

			<Container className="relative z-10">
				{/* Header - Masofalar ixchamlashtirildi */}
				<div className="text-start md:text-center max-w-3xl mx-auto mb-10 md:mb-14">
					<motion.span
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						className="text-[#C59D5F] text-[9px] md:text-[10px] font-bold tracking-[0.4em] uppercase block mb-3"
					>
						• {t.subtitle} •
					</motion.span>
					<h2 className="text-xl md:text-3xl font-serif uppercase tracking-widest leading-tight">
						{t.title}
					</h2>
				</div>

				{/* Testimonials Grid - Ixchamroq padding va kichikroq text */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
					{items.map((item, index) => (
						<motion.div
							key={index}
							initial={{ y: 20, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							className="group bg-white/[0.04] border border-white/5 p-6 md:p-8 flex flex-col justify-between h-full hover:border-[#C59D5F]/20 transition-colors duration-500"
						>
							<div>
								{/* Text - Shrift o'lchami kichraytirildi */}
								<p className="text-gray-400 text-[13px] md:text-[14px] leading-relaxed mb-6 font-light italic">
									"{item.text}"
								</p>

								{/* Rating - Yulduzchalar ixchamroq */}
								<div className="flex gap-1 mb-8">
									{[...Array(item.stars)].map((_, i) => (
										<FaStar key={i} className="text-[#C59D5F] text-[10px]" />
									))}
								</div>
							</div>

							{/* Author Information */}
							<div className="border-t border-white/5 pt-4">
								<h4 className="text-white font-serif text-[15px] md:text-[16px] tracking-wide uppercase mb-1">
									{item.name}
								</h4>
								<span className="text-[#C59D5F] text-[9px] font-bold tracking-[0.2em] uppercase">
									{item.role}
								</span>
							</div>
						</motion.div>
					))}
				</div>

				{/* CTA Button */}
				<div className="flex justify-center relative z-30">
					<GoldButton
						onClick={() =>
							document
								.getElementById("contact")
								?.scrollIntoView({ behavior: "smooth" })
						}
						className="scale-90 md:scale-100">{t.cta}</GoldButton>
				</div>
			</Container>
		</section>
	);
};
