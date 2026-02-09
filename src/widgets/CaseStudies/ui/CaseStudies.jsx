"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/shared/ui/Container/Container";
import { GoldButton } from "@/shared/ui/GoldButton/GoldButton";

const cases = [
  { title: "Personal Injury", img: "/Margin.png" },
  { title: "Investment", img: "/Margin.png" },
  { title: "Legal Separation", img: "/Margin.png" },
  { title: "Domestic Violence", img: "/Margin.png" },
  { title: "Illegal", img: "/Margin.png" },
  { title: "Digital Crime", img: "/Margin.png" },
];

export const CaseStudies = ({ dict }) => {
  const s = dict?.case_studies || {};

  return (
    <section className="py-24 bg-[#0a0a0a] border-t border-white/5">
      <Container>
        {/* Header Section */}
        <div className="mb-20 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center md:justify-start gap-3 mb-4"
          >
            <span className="w-8 h-[1px] bg-[#C59D5F]" />
            <span className="text-[#C59D5F] text-[10px] font-bold uppercase tracking-[0.4em]">
              {s.badge || "Case Studies"}
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif italic text-white max-w-2xl leading-tight"
          >
            {s.title || "Many projects Done that make us Stand out"}
          </motion.h2>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-24">
          {cases.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col group relative"
            >
              {/* Image Box */}
              <div className="relative w-full h-[400px] overflow-hidden rounded-sm">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
              </div>

              {/* Info Box */}
              <div className="relative z-10 w-[85%] ml-auto -mt-20 bg-[#111111]/90 border border-white/5 p-6 shadow-2xl backdrop-blur-md">
                <div className="text-right mb-6">
                  <h3 className="text-lg font-serif italic text-white uppercase tracking-wider mb-2 group-hover:text-[#C59D5F] transition-colors">
                    {item.title}
                  </h3>
                  <div className="w-12 h-[1px] bg-[#C59D5F] ml-auto mb-3" />
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest italic">
                    {s.subtitle || "Legal Protection Strategy"}
                  </p>
                </div>

                {/* Yangi GoldButton integratsiyasi */}
                <div className="w-full">
                  <GoldButton className="w-full !px-0 !py-3">
                    {s.read_more || "Read More"}
                  </GoldButton>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
