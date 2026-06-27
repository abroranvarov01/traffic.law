"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/shared/ui/Container/Container";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

export const AgentInfo = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
    viewport: { once: true },
  };

  return (
    <section className="py-24 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* --- CHAP QISM: Profil va Forma --- */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div {...fadeInUp}>
              {/* Rasm va Ism kartasi */}
              <div className="relative group">
                <div className="relative h-[400px] w-full bg-[#1a120b] overflow-hidden">
                  <Image
                    src="/Container.png"
                    alt="Jashon"
                    fill
                    className="object-cover object-top"
                  />
                  {/* Oq rangli ism bloki (Rasm ustida) */}
                  <div className="absolute bottom-0 left-0 bg-white p-6 pr-12 shadow-xl z-10">
                    <h3 className="text-xl font-serif text-[#1a1612] uppercase tracking-widest italic">
                      Jashon
                    </h3>
                    <p className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter">
                      Criminal Lawyer
                    </p>
                  </div>
                </div>

                {/* Socials - Rasm tagidagi qora chiziq */}
                <div className="flex justify-center gap-6 bg-[#1a120b] py-5">
                  {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map(
                    (Icon, i) => (
                      <a
                        key={i}
                        href="#"
                        className="text-gray-400 hover:text-[#C59D5F] transition-colors"
                      >
                        <Icon size={14} />
                      </a>
                    )
                  )}
                </div>
              </div>
            </motion.div>

            {/* Make An Appointment Formasi */}
            <motion.div
              {...fadeInUp}
              className="bg-[#C59D5F] p-8 md:p-10 shadow-2xl"
            >
              <h4 className="text-black font-serif text-xl mb-6 uppercase tracking-widest italic">
                Make An Appointment
              </h4>
              <form className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-black/5 border-b border-black/10 p-3 text-xs outline-none placeholder-black/60 focus:border-black transition-all"
                  />
                  <input
                    type="text"
                    placeholder="Your Phone"
                    className="w-full bg-black/5 border-b border-black/10 p-3 text-xs outline-none placeholder-black/60 focus:border-black transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full bg-black/5 border-b border-black/10 p-3 text-xs outline-none placeholder-black/60 focus:border-black transition-all"
                  />
                  <input
                    type="text"
                    placeholder="Appointment Date"
                    className="w-full bg-black/5 border-b border-black/10 p-3 text-xs outline-none placeholder-black/60 focus:border-black transition-all"
                  />
                </div>
                <textarea
                  rows={4}
                  placeholder="Message"
                  className="w-full bg-black/5 border-b border-black/10 p-3 text-xs outline-none placeholder-black/60 focus:border-black transition-all resize-none"
                ></textarea>
                <button className="w-full bg-[#1a120b] text-[#C59D5F] py-4 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-black transition-all mt-4">
                  Send
                </button>
              </form>
            </motion.div>
          </div>

          {/* --- O'NG QISM: Bio va Tajriba --- */}
          <div className="lg:col-span-8 lg:pl-6 space-y-12">
            {/* Bio qismi */}
            <motion.div {...fadeInUp}>
              <span className="text-[#C59D5F] text-[10px] font-bold uppercase tracking-[0.4em] italic mb-3 block">
                Our Experiences
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#1a1612] mb-8 italic">
                About Jashon
              </h2>
              <div className="space-y-6 text-gray-500 text-[15px] leading-relaxed italic max-w-2xl">
                <p>
                  Faucibus ad dis sem sociosqu ullamcorper magna sociis mus mi
                  etiam, quam eu augue cursus ornare dictumst nostra purus
                  placerat pellentesque.
                </p>
                <p>
                  Convallis quam praesent mattis mi consequat laoreet odio,
                  phasellus diam viverra varius cubilia pulvinar potenti
                  facilisi, faucibus volutpat sed semper dignissim ullamcorper.
                </p>
              </div>
            </motion.div>

            {/* Kontakt kartalari */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                {...fadeInUp}
                className="flex items-center gap-6 bg-[#1a120b] p-7 group"
              >
                <div className="w-14 h-14 rounded-full border border-[#C59D5F]/30 flex items-center justify-center text-[#C59D5F] group-hover:bg-[#C59D5F] group-hover:text-black transition-all duration-500">
                  <FaPhoneAlt size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">
                    Phone
                  </p>
                  <p className="text-white font-serif text-lg italic tracking-wider">
                    +6297501
                  </p>
                </div>
              </motion.div>
              <motion.div
                {...fadeInUp}
                className="flex items-center gap-6 bg-[#1a120b] p-7 group"
              >
                <div className="w-14 h-14 rounded-full border border-[#C59D5F]/30 flex items-center justify-center text-[#C59D5F] group-hover:bg-[#C59D5F] group-hover:text-black transition-all duration-500">
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">
                    Email
                  </p>
                  <p className="text-white font-serif text-lg italic tracking-wider">
                    jason@lawone.com
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Timeline (O'qish va Tajriba) */}
            <div className="space-y-0 pt-6">
              {[
                {
                  school: "HARVEY MUDD COLLEGE",
                  year: "2011 - 2014",
                  degree: "BACHELOR OF ARTS",
                  desc: "Lorem ipsum dolor sit amet consectetur lacus augue phasellus.",
                },
                {
                  school: "OXFORD UNIVERSITY",
                  year: "2015 - 2016",
                  degree: "MASTER OF LAW",
                  desc: "Lorem ipsum dolor sit amet consectetur lacus augue phasellus.",
                },
                {
                  school: "OXFORD UNIVERSITY",
                  year: "2016 - 2018",
                  degree: "DOCTOR OF LAWS",
                  desc: "Lorem ipsum dolor sit amet consectetur lacus augue phasellus.",
                },
              ].map((edu, idx) => (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  transition={{ delay: idx * 0.1 }}
                  className="relative flex gap-12"
                >
                  {/* Circle & Vertical Line */}
                  <div className="flex flex-col items-center">
                    <div className="w-5 h-5 rounded-full border-2 border-[#C59D5F] bg-white z-10" />
                    {idx !== 2 && (
                      <div className="w-[1px] h-full bg-gray-200 absolute top-5" />
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-8 pb-12">
                    <div className="space-y-1">
                      <h5 className="text-sm font-bold uppercase tracking-widest text-[#1a1612]">
                        {edu.school}
                      </h5>
                      <p className="text-[11px] text-gray-400 font-bold">
                        {edu.year}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h5 className="text-sm font-bold uppercase tracking-widest text-[#1a1612] italic">
                        {edu.degree}
                      </h5>
                      <p className="text-xs text-gray-500 leading-relaxed italic">
                        {edu.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
