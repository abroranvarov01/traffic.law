"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const ServiceCard = ({ title, desc, img }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="relative group cursor-pointer bg-white shadow-xl overflow-hidden"
    >
      {/* Asosiy rasm */}
      <div className="relative h-[400px] w-full">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500" />
      </div>

      {/* Kontent qismi */}
      <div className="relative -mt-20 ml-auto w-[85%] bg-white p-8 z-10 shadow-[-15px_0_30px_rgba(0,0,0,0.05)]">
        <h3 className="text-2xl font-serif text-[#1a1612] uppercase tracking-tighter mb-2 italic">
          {title}
        </h3>
        <p className="text-gray-400 text-sm mb-6 italic">{desc}</p>

        <button className="w-full bg-[#fdd67c] py-4 text-black font-black uppercase tracking-widest text-[11px] hover:bg-black hover:text-[#fdd67c] transition-all duration-300">
          Read More
        </button>
      </div>

      {/* Tilla chiziq overlay */}
      <div className="absolute top-0 left-0 w-1.5 h-full bg-[#C59D5F] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
    </motion.div>
  );
};
