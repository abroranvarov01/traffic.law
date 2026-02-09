"use client";
import React from "react";
import Image from "next/image";
import { Container } from "@/shared/ui/Container/Container";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export const ContactSupport = () => {
  // Animatsiya variantlari
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    viewport: { once: true },
  };

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: { staggerChildren: 0.1 },
    },
    viewport: { once: true },
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
        >
          {/* Chap qism: Ofislar ma'lumotlari */}
          <div className="flex flex-col gap-12">
            <motion.div variants={fadeInUp}>
              <span className="text-[#C59D5F] text-[10px] font-bold uppercase tracking-[0.4em] block mb-4 italic">
                Get In Touch
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#1a1612] leading-tight italic">
                Contact our support
              </h2>
            </motion.div>

            {/* Office 01 */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col md:flex-row gap-6 items-start group"
            >
              <div className="relative w-full md:w-[240px] h-[160px] flex-shrink-0 overflow-hidden">
                <Image
                  src="/towr.avif"
                  alt="UK Office"
                  fill
                  className="object-cover border-l-4 border-[#C59D5F] transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-[#C59D5F] text-[10px] font-bold italic uppercase tracking-widest">
                  Office 01
                </span>
                <h3 className="text-xl font-serif text-[#1a1612] italic">
                  United Kingdom
                </h3>
                <div className="text-gray-500 text-sm flex flex-col gap-2 mt-2">
                  <p className="flex items-center gap-3">
                    <FaEnvelope className="text-[#C59D5F]" /> lawone@ukmail.com
                  </p>
                  <p className="flex items-center gap-3">
                    <FaPhoneAlt className="text-[#C59D5F]" /> +6209-0826-9263
                  </p>
                  <p className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-[#C59D5F]" /> Jl.
                    Soekarno-Hatta Km05
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Office 02 */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col md:flex-row gap-6 items-start group"
            >
              <div className="relative w-full md:w-[240px] h-[160px] flex-shrink-0 overflow-hidden">
                <Image
                  src="/towr.avif"
                  alt="Netherlands Office"
                  fill
                  className="object-cover border-l-4 border-[#C59D5F] transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-[#C59D5F] text-[10px] font-bold italic uppercase tracking-widest">
                  Office 02
                </span>
                <h3 className="text-xl font-serif text-[#1a1612] italic">
                  Netherlands
                </h3>
                <div className="text-gray-500 text-sm flex flex-col gap-2 mt-2">
                  <p className="flex items-center gap-3">
                    <FaEnvelope className="text-[#C59D5F]" /> lawone@nsmail.com
                  </p>
                  <p className="flex items-center gap-3">
                    <FaPhoneAlt className="text-[#C59D5F]" /> +6209-0826-9263
                  </p>
                  <p className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-[#C59D5F]" /> Jl.
                    Soekarno-Hatta Km09
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* O'ng qism: Tilla rangli bog'lanish formasi */}
          <motion.div
            variants={fadeInUp}
            className="bg-[#C59D5F] p-10 md:p-14 shadow-[0_20px_50px_rgba(197,157,95,0.3)] relative"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-black mb-10 italic">
              Contact With Us
            </h2>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-black/5 border-b border-black/10 p-4 placeholder-black/60 text-black outline-none focus:border-black transition-all"
              />
              <input
                type="text"
                placeholder="Your Phone"
                className="w-full bg-black/5 border-b border-black/10 p-4 placeholder-black/60 text-black outline-none focus:border-black transition-all"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full bg-black/5 border-b border-black/10 p-4 placeholder-black/60 text-black outline-none focus:border-black transition-all"
              />
              <div className="relative">
                <select className="w-full bg-black/5 border-b border-black/10 p-4 text-black/60 outline-none focus:border-black transition-all appearance-none cursor-pointer">
                  <option>Choose Services</option>
                  <option>Legal Advice</option>
                  <option>Criminal Law</option>
                </select>
              </div>
              <textarea
                placeholder="Message"
                rows={4}
                className="w-full bg-black/5 border-b border-black/10 p-4 placeholder-black/60 text-black outline-none focus:border-black transition-all resize-none"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-[#1a1612] text-[#C59D5F] py-5 font-black uppercase tracking-[0.3em] hover:bg-black active:scale-[0.98] transition-all mt-4 shadow-xl"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};
