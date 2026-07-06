"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/shared/ui/Container/Container";

// Bloklar ketma-ketligini render qiladi, ketma-ket keladigan
// "li" bloklarni bitta <ul> ichiga guruhlaydi.
const renderBlocks = (blocks) => {
  const nodes = [];
  let list = null;

  const flushList = (key) => {
    if (list) {
      nodes.push(
        <ul key={`ul-${key}`} className="my-4 flex flex-col gap-3 pl-1">
          {list}
        </ul>,
      );
      list = null;
    }
  };

  blocks.forEach((block, i) => {
    const { t, c } = block;

    if (t === "li") {
      list = list || [];
      list.push(
        <li key={i} className="relative pl-6 text-[15px] leading-relaxed text-gray-300">
          <span className="absolute left-0 top-[10px] h-[6px] w-[6px] rounded-full bg-[#C59D5F]" />
          {c}
        </li>,
      );
      return;
    }

    flushList(i);

    switch (t) {
      case "h1":
        // Sarlavha tab nomida ko'rsatiladi — bu yerda faqat ekran o'quvchilar uchun.
        nodes.push(
          <h2 key={i} className="sr-only">
            {c}
          </h2>,
        );
        break;
      case "h2":
        nodes.push(
          <h3
            key={i}
            className="mt-12 mb-4 border-l-2 border-[#C59D5F] pl-4 font-serif text-xl md:text-2xl uppercase tracking-wide text-white"
          >
            {c}
          </h3>,
        );
        break;
      case "h3":
        nodes.push(
          <h4 key={i} className="mt-8 mb-3 text-lg font-semibold text-[#C59D5F]">
            {c}
          </h4>,
        );
        break;
      default:
        nodes.push(
          <p key={i} className="my-4 text-[15px] leading-relaxed text-gray-300">
            {c}
          </p>,
        );
    }
  });

  flushList("end");
  return nodes;
};

export const LegalDocs = ({ docs, labels }) => {
  const tabs = [
    { key: "privacy", label: labels.privacy, blocks: docs.privacy },
    { key: "agreement", label: labels.agreement, blocks: docs.agreement },
  ];

  const [active, setActive] = useState("privacy");
  const current = tabs.find((tab) => tab.key === active) || tabs[0];

  return (
    <section className="bg-[#0a0a0a] py-16 md:py-20">
      <Container>
        {/* Tab tugmalari — ikkita hujjat o'rtasida almashish */}
        <div className="mb-10 flex max-w-3xl mx-auto flex-col gap-3 sm:flex-row sm:flex-wrap">
          {tabs.map((tab) => {
            const isActive = tab.key === active;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActive(tab.key)}
                aria-pressed={isActive}
                className={`rounded-md border px-5 py-3 text-left text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                  isActive
                    ? "border-[#C59D5F] bg-[#C59D5F] text-black"
                    : "border-white/10 bg-white/5 text-gray-400 hover:border-[#C59D5F]/50 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Hujjat matni */}
        <AnimatePresence mode="wait">
          <motion.article
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="max-w-3xl mx-auto rounded-xl border border-white/5 bg-white/[0.02] p-6 md:p-10"
          >
            {renderBlocks(current.blocks)}
          </motion.article>
        </AnimatePresence>
      </Container>
    </section>
  );
};
