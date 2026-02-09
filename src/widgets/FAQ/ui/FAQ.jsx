"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/shared/ui/Container/Container";
import { MdKeyboardArrowDown } from "react-icons/md";

const faqData = [
  {
    q: "AENEAN VESTIBULUM",
    a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
  },
  {
    q: "LIGULA LUCTUS MAURIS",
    a: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
  },
  {
    q: "TRISTIQUE LACINIA SED",
    a: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    q: "QUAM JUSTO TORQUENT",
    a: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    q: "FEUGIAT NASCETUR MONTES",
    a: "Magna ac placerat vestibulum lectus mauris ultrices eros in. Cursus vitae congue mauris rhoncus aenean vel.",
  },
];

export const FAQ = () => {
  const [active, setActive] = useState(null);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Orqa fon rasmi (Building overlay) */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="w-full h-full bg-[url('/cards.png')] bg-center bg-no-repeat bg-contain" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-3xl">
          <span className="text-[#C59D5F] text-[10px] font-bold uppercase tracking-[0.4em] block mb-2 italic">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#1a1612] mb-12 italic">
            Frequently Asked Questions
          </h2>

          <div className="flex flex-col gap-3">
            {faqData.map((item, i) => (
              <div key={i} className="border-none">
                <button
                  onClick={() => setActive(active === i ? null : i)}
                  className="w-full bg-[#C59D5F] p-5 flex items-center justify-between text-black font-serif tracking-widest text-sm hover:bg-[#b38e54] transition-all"
                >
                  <span className="uppercase">{item.q}</span>
                  <MdKeyboardArrowDown
                    className={`transition-transform duration-300 ${
                      active === i ? "rotate-180" : ""
                    }`}
                    size={20}
                  />
                </button>

                <AnimatePresence>
                  {active === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-[#f9f5f0]"
                    >
                      <div className="p-6 text-gray-600 text-sm leading-relaxed italic">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
