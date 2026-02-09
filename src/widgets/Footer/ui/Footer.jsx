"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/shared/ui/Container/Container";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaTelegramPlane,
} from "react-icons/fa";

export const Footer = ({ dict }) => {
  const t = dict?.footer || {};

  return (
    <footer className="relative bg-[#070707] pt-20 pb-10 overflow-hidden text-white border-t border-white/5">
      {/* 1. Background Texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <Image
          src="/news/koja.png"
          alt="texture"
          fill
          className="object-cover grayscale"
        />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row justify-between gap-12 ">
          {/* Slogan */}
          <div className="w-full lg:w-1/3">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-3xl font-serif uppercase leading-tight tracking-wider "
            >
              {t.slogan}
            </motion.h2>
          </div>

          {/* Navigation Links */}
          <div className="w-full lg:w-2/3 flex flex-col md:flex-row justify-between gap-8 md:gap-4">
            <div className="flex flex-col md:flex-row gap-12 md:gap-24">
              {t.columns?.map((col, idx) => (
                <div key={idx} className="flex flex-col gap-4">
                  {col.title && (
                    <h4 className="text-[10px] md:text-[11px] font-bold text-gray-500 tracking-[0.3em] uppercase mb-2">
                      {col.title}
                    </h4>
                  )}
                  <ul className="flex flex-col gap-3">
                    {col.links?.map((link, lIdx) => (
                      <li key={lIdx}>
                        <Link
                          href={link.href}
                          className="text-[10px] md:text-[11px] font-medium text-gray-400 hover:text-[#C59D5F] transition-colors uppercase tracking-[0.2em]"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex items-start gap-4">
              {[
                { icon: <FaInstagram />, href: "#" },
                { icon: <FaFacebookF />, href: "#" },
                { icon: <FaYoutube />, href: "#" },
                { icon: <FaTelegramPlane />, href: "#" },
              ].map((social, sIdx) => (
                <Link
                  key={sIdx}
                  href={social.href}
                  className="w-10 h-10 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#C59D5F] hover:text-black transition-all duration-300"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Giant Main Logo Section (Fon bilan birikib ketadigan qism) */}
        <div className="relative w-full  flex justify-center border-t border-white/5">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative w-full h-[120px] sm:h-[180px] md:h-[280px] lg:h-[380px]"
            style={{
              /* Rasmning chekkalarini o'chirib, fon bilan uyg'unlashtiradi */
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 15%, black 85%, transparent), linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
              WebkitMaskComposite: "destination-in",
              maskImage:
                "linear-gradient(to right, transparent, black 15%, black 85%, transparent), linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
              maskComposite: "intersect",
            }}
          >
            <Image
              src="/news/traffic.png"
              alt="Traffic Law Logo Full"
              fill
              className="object-cover object-center opacity-90 group-hover:opacity-100 transition-opacity duration-700"
              priority
            />
          </motion.div>
        </div>

        {/* 3. Copyright */}
        <div className="mt-8 pt-8 mb-12 border-t border-white/5 text-center">
          <p className="text-[10px] md:text-[11px] text-gray-600 tracking-[0.3em] uppercase">
            {t.copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
};
