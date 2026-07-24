"use client";
import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/shared/ui/Container/Container";

export const CaseStudies = ({ dict }) => {
  const s = dict?.case_studies || {};
  const items = s.items || [];
  const labels = s.labels || {};

  const blocks = [
    { key: "situation", label: labels.situation || "Situation" },
    { key: "solution", label: labels.solution || "Solution" },
    { key: "result", label: labels.result || "Result" },
  ];

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
            className="text-4xl md:text-5xl font-serif italic text-white max-w-3xl leading-tight"
          >
            {s.title}
          </motion.h2>
        </div>

        {/* Cases */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {items.map((item, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
              viewport={{ once: true }}
              className="group relative flex flex-col rounded-sm border border-white/5 bg-white/[0.03] p-7 md:p-9 transition-colors duration-700 hover:border-[#C59D5F]/40 hover:bg-white/[0.05]"
            >
              {/* Number + title */}
              <div className="mb-6 flex items-start gap-4 border-b border-white/10 pb-5">
                <span className="font-serif text-3xl italic leading-none text-[#C59D5F]/50 transition-colors duration-500 group-hover:text-[#C59D5F]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-serif text-lg md:text-xl uppercase tracking-[0.1em] text-white transition-colors group-hover:text-[#C59D5F]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[10px] uppercase tracking-widest italic text-gray-500">
                    {s.subtitle}
                  </p>
                </div>
              </div>

              {/* Situation / Solution / Result */}
              <div className="space-y-5">
                {blocks.map(({ key, label }) =>
                  item[key] ? (
                    <div key={key} className="relative pl-5">
                      <span className="absolute left-0 top-[7px] h-1.5 w-1.5 rounded-full bg-[#C59D5F] opacity-70" />
                      <h4 className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C59D5F]">
                        {label}
                      </h4>
                      <p className="text-[13px] md:text-[14px] font-light leading-relaxed text-gray-300">
                        {item[key]}
                      </p>
                    </div>
                  ) : null
                )}
              </div>

              {/* Hover Line */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#C59D5F] transition-all duration-500 group-hover:w-full" />
            </motion.article>
          ))}
        </div>

        {s.disclaimer && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-14 text-center text-[12px] font-light italic text-gray-500"
          >
            {s.disclaimer}
          </motion.p>
        )}
      </Container>
    </section>
  );
};
