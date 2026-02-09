"use client";
import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/shared/ui/Container/Container";
import Image from "next/image";

const Appointment = () => {
  return (
    <section className="relative w-full bg-white -mt-1 z-40 overflow-hidden py-16 lg:py-24">
      <Container>
        {/* Asosiy blok - overflow-hidden rasm chiqib ketmasligini ta'minlaydi */}
        <div className="flex flex-col lg:flex-row items-stretch bg-[#C59D5F] shadow-2xl relative overflow-hidden rounded-sm">
          {/* Chap qism: Advokat rasmi - Endi blok ichida markazlashgan */}
          <div className="w-full lg:w-1/2 relative min-h-[400px] md:min-h-[500px]">
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <Image
                src="/lawho07-800x517.png.png"
                alt="Lawyer working"
                fill
                className="object-contain object-bottom "
                priority
              />
              {/* Rasm ustiga ozgina quyuqlashtiruvchi qatlam (matn yaxshi o'qilishi uchun) */}
              <div className="absolute inset-0 bg-black/5" />
            </motion.div>
          </div>

          {/* O'ng qism: Forma */}
          <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 z-10 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-serif text-[#1a1612] uppercase mb-4 tracking-tight leading-tight">
                Make An Appointment
              </h2>
              <p className="text-[#1a1612]/70 text-[13px] leading-relaxed mb-8 max-w-md">
                Mollis pulvinar parturient fusce aptent conubia primis mattis
                nulla accumsan, ullamcorper felis mi aenean mus potenti nunc.
              </p>

              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="bg-white/20 border-none px-4 py-4 text-[13px] text-[#1a1612] placeholder-[#1a1612]/60 outline-none focus:bg-white/30 transition-all"
                />
                <input
                  type="text"
                  placeholder="Your Phone"
                  className="bg-white/20 border-none px-4 py-4 text-[13px] text-[#1a1612] placeholder-[#1a1612]/60 outline-none focus:bg-white/30 transition-all"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="bg-white/20 border-none px-4 py-4 text-[13px] text-[#1a1612] placeholder-[#1a1612]/60 outline-none focus:bg-white/30 transition-all"
                />
                <input
                  type="text"
                  placeholder="Date"
                  className="bg-white/20 border-none px-4 py-4 text-[13px] text-[#1a1612] placeholder-[#1a1612]/60 outline-none focus:bg-white/30 transition-all"
                />
                <textarea
                  placeholder="Message"
                  rows="3"
                  className="md:col-span-2 bg-white/20 border-none px-4 py-4 text-[13px] text-[#1a1612] placeholder-[#1a1612]/60 outline-none resize-none focus:bg-white/30 transition-all"
                />

                <motion.button
                  whileHover={{ backgroundColor: "#1a1612", color: "#fff" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="md:col-span-2 bg-[#1a1612] text-white font-bold py-4 uppercase text-[11px] tracking-[0.2em] transition-all duration-300 mt-2"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Appointment;
