"use client";
import React from "react";
import { motion } from "framer-motion";

export const GoldButton = ({ children, className = "", onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      // Hover va Active animatsiyalari
      whileHover="hover"
      whileTap="active"
      initial="initial"
      className={`relative group overflow-hidden px-10 py-4 rounded-lg transition-all duration-150 active:translate-y-[2px] ${className}`}
      style={{
        background:
          "linear-gradient(180deg, #F3D393 0%, #D4A762 50%, #B68541 100%)",
        boxShadow: "0px 4px 0px #8B6229, 0px 10px 20px rgba(0,0,0,0.4)",
      }}
      variants={{
        initial: {
          scale: 1,
          boxShadow: "0px 4px 0px #8B6229, 0px 10px 20px rgba(0,0,0,0.4)",
        },
        hover: {
          scale: 1.02,
          boxShadow: "0px 5px 0px #8B6229, 0px 12px 25px rgba(0,0,0,0.5)",
          filter: "brightness(1.1)",
        },
        active: {
          scale: 0.98,
          boxShadow: "0px 1px 0px #8B6229, 0px 4px 10px rgba(0,0,0,0.3)",
          translateY: "3px", // Tugma bosilgandagi 3D effekt
        },
      }}
    >
      {/* 1. Tugma ustidagi yaltiroq "shisha" (Glossy) qatlami */}
      <div className="absolute inset-0 opacity-40 bg-gradient-to-b from-white via-transparent to-transparent pointer-events-none transition-opacity group-hover:opacity-60" />

      {/* 2. Ichki nozik chegara (Inner border) */}
      <div className="absolute inset-[1px] rounded-[7px] border border-white/30 pointer-events-none" />

      {/* 3. Kontent (Matn va Detallar) */}
      <div className="relative z-10 flex items-center justify-center gap-4">
        {/* Chapdagi detal */}
        <motion.div
          variants={{ hover: { rotate: 135, scale: 1.2 } }}
          className="w-1.5 h-1.5 bg-[#2D1F16] rotate-45 transition-transform duration-500"
        />

        <span className="text-[#2D1F16] font-[900] uppercase tracking-[0.25em] text-[11px] select-none">
          {children}
        </span>

        {/* O'ngdagi detal */}
        <motion.div
          variants={{ hover: { rotate: 135, scale: 1.2 } }}
          className="w-1.5 h-1.5 bg-[#2D1F16] rotate-45 transition-transform duration-500"
        />
      </div>

      {/* 4. Hoverda "Yaqin o'tuvchi nur" (Shine effect) */}
      <motion.div
        variants={{
          hover: { x: "200%" },
        }}
        initial={{ x: "-100%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] pointer-events-none"
      />

      {/* 5. Bosilganda (Active) paydo bo'ladigan xira qatlam */}
      <div className="absolute inset-0 bg-black/5 opacity-0 active:opacity-100 transition-opacity" />
    </motion.button>
  );
};
