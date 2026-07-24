"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/shared/ui/Container/Container";

export const Team = ({ dict }) => {
  const t = dict?.team || {};
  const members = t.members || [];

  return (
    <section className="relative bg-[#070707] py-4 md:py-4 overflow-hidden text-white">
      <Container>
        {/* --- Header Section --- */}
        <div className="text-center mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#C59D5F] text-[10px] font-bold tracking-[0.4em] uppercase block mb-6"
          >
            • {t.subtitle} •
          </motion.span>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-serif uppercase tracking-widest leading-tight">
            {t.title}
          </h2>
        </div>

        {/* --- Team Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-6">
          {members.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative flex flex-col"
            >
              {/* Image Container with Hover Frame */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-4 border border-white/5 transition-colors duration-500 group-hover:border-[#0091FF] group-hover:shadow-[0_0_30px_rgba(0,145,255,0.2)] transform-gpu [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
                {/* Background Shadow Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-transparent z-10" />

                <Image
                  src={`/news/team-${index + 1}.png`} // Rasmlarni team-1.png, team-2.png qilib nomlang
                  alt={member.name}
                  fill
                  className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                />

                {/* Blue Border Overlay (Visible on Hover like Figma) */}
                <div className="absolute inset-0 border-[2px] border-[#0091FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none" />
              </div>

              {/* Text Information Box */}
              <div className="bg-white/[0.04] border border-white/5 p-6 flex flex-col items-center text-center transition-colors duration-500 group-hover:bg-white/[0.06]">
                <h4 className="text-white font-serif text-[15px] lg:text-[17px] tracking-wide uppercase mb-2 whitespace-nowrap">
                  {member.name}
                </h4>
                <p className="text-[#C59D5F] text-[9px] lg:text-[10px] font-bold tracking-[0.15em] leading-relaxed uppercase">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- View All Button (Premium Gold Style) --- */}
        {/* <div className="flex justify-center mt-20">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group overflow-hidden px-10 py-4 md:px-14 md:py-5 rounded-lg transition-all duration-300"
            style={{
              background:
                "linear-gradient(180deg, #F3D393 0%, #D4A762 50%, #B68541 100%)",
              boxShadow: "0px 4px 0px #8B6229, 0px 10px 25px rgba(0,0,0,0.5)",
            }}
          >
            <div className="absolute inset-0 opacity-30 bg-gradient-to-b from-white via-transparent to-transparent pointer-events-none" />

          
            <div className="absolute inset-[1px] rounded-[7px] border border-white/20 pointer-events-none" />

            <div className="relative z-10 flex items-center justify-center gap-4">
              <div className="w-1.5 h-1.5 bg-[#2D1F16] rotate-45 group-hover:scale-125 transition-transform duration-300" />
              <span className="text-[#2D1F16] font-black uppercase tracking-[0.2em] text-[10px] md:text-[11px]">
                {t.view_all}
              </span>
              <div className="w-1.5 h-1.5 bg-[#2D1F16] rotate-45 group-hover:scale-125 transition-transform duration-300" />
            </div>

          
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          </motion.button>
        </div> */}
      </Container>
    </section>
  );
};
