"use client";
import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/shared/ui/Container/Container";
import { FiPhone, FiClock, FiMapPin } from "react-icons/fi";
import { ContactForm } from "@/components/ContactForm/ContactForm";

export const ContactSection = ({ dict }) => {
  const t = dict?.contact || {};

  return (
    <section
      id="contact"
      className="relative bg-[#070707] py-12 overflow-hidden text-white border-t border-white/5 scroll-mt-24"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C59D5F]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#C59D5F]/5 blur-[150px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* --- Chap tomondagi ma'lumotlar --- */}
          <div className="w-full lg:w-[45%]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-1.5 h-1.5 bg-[#C59D5F] rotate-45" />
              <span className="text-[#C59D5F] text-[10px] md:text-[9px] font-bold tracking-[0.4em] uppercase">
                {t.subtitle}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-2xl font-serif uppercase leading-tight tracking-wide mb-8 italic"
            >
              {t.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-sm md:text-base leading-relaxed mb-12  py-1"
            >
              {t.desc}
            </motion.p>

            {/* Kontakt detallari */}
            <div className="space-y-6 md:space-y-8">
              {[
                {
                  icon: <FiPhone />,
                  title: t.info?.phone_title,
                  value: "+998 99 989 88 99",
                },
                {
                  icon: <FiClock />,
                  title: t.info?.work_title,
                  value: t.info?.work_time,
                },
                {
                  icon: <FiMapPin />,
                  title: t.info?.office_title,
                  value: t.info?.address,
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="flex items-center gap-5 md:gap-6 group"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-lg md:text-xl text-[#C59D5F] group-hover:bg-[#C59D5F] group-hover:text-black transition-all duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[9px] md:text-[10px] text-gray-500 font-bold tracking-[0.2em] mb-1">
                      {item.title}
                    </p>
                    <p className="text-base md:text-lg font-serif tracking-wide italic">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* --- O'ng tomondagi Forma (Glassmorphism) --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="w-full lg:w-[55%] bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-12 shadow-2xl"
          >
           <ContactForm t={t}/>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
