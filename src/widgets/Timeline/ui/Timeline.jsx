"use client";
import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/shared/ui/Container/Container";

const timelineData = [
  {
    year: "2014",
    title: "STARTED JOURNEY",
    desc: "Accumsan enim potenti aliquet arcu nisi proin mollis class.",
  },
  {
    year: "2016",
    title: "WE EMPLOYED LAWYERS",
    desc: "Accumsan enim potenti aliquet arcu nisi proin mollis class.",
  },
  {
    year: "2017",
    title: "WINNING BEST AWARDS",
    desc: "Accumsan enim potenti aliquet arcu nisi proin mollis class.",
  },
  {
    year: "2021",
    title: "IMPROVED TEAM",
    desc: "Accumsan enim potenti aliquet arcu nisi proin mollis class.",
  },
];

const Timeline = () => {
  return (
    <section className="relative w-full bg-white py-20 lg:py-32 overflow-hidden">
      <Container>
        <div className="relative">
          {/* Desktop Full-Width Line */}
          <div className="absolute top-[48px] left-[-100vw] right-[-100vw] h-[2px] bg-gray-200 hidden md:block z-0" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 relative z-10">
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative flex flex-row md:flex-col items-start md:items-center text-left md:text-center group"
              >
                {/* Mobile Vertical Line */}
                {index !== timelineData.length - 1 && (
                  <div className="absolute left-[11px] top-[30px] w-[2px] h-full bg-gray-100 md:hidden" />
                )}

                {/* Node Section */}
                <div className="flex flex-col items-center shrink-0">
                  <span className="hidden md:block text-[16px] font-bold text-[#1a1612] mb-6 tracking-widest transition-colors group-hover:text-[#C59D5F]">
                    {item.year}
                  </span>
                  <div className="w-[24px] h-[24px] rounded-full border-[2px] border-gray-300 bg-white flex items-center justify-center z-10 group-hover:border-[#C59D5F] transition-all duration-300">
                    <div className="w-2 h-2 bg-gray-400 rounded-full group-hover:bg-[#C59D5F] transition-colors" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="ml-6 md:ml-0 md:mt-10">
                  <span className="md:hidden text-[13px] font-bold text-[#C59D5F] mb-1 block">
                    {item.year}
                  </span>
                  <h3 className="text-[14px] font-black text-[#1a1612] uppercase tracking-[0.15em] mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-[13px] leading-relaxed max-w-[220px]">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Timeline;
