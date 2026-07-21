"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaExpandArrowsAlt, FaCompressArrowsAlt } from "react-icons/fa";

export const ContactMap = ({ dict, lang }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const t = dict?.contact_map || {};

  // REAL COORDINATES: 41.332308, 69.284205 (Traffic Law Service)
  // ll = longitude (69.284205) va latitude (41.332308)
  // z = 17 (Yaqinroq va aniq markazda)
  const mapSource = `https://yandex.com/map-widget/v1/?ll=69.284205%2C41.332308&z=17&mode=search&ol=geo&lang=${
    lang === "uz" ? "uz_UZ" : lang === "ru" ? "ru_RU" : "en_US"
  }`;

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isExpanded]);

  return (
    <section className="relative w-full h-[550px] bg-[#070707] border-y border-white/5 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={isExpanded ? "expanded" : "compact"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "circOut" }}
          className={
            isExpanded
              ? "fixed inset-0 z-[9999] w-screen h-screen bg-[#070707]"
              : "relative w-full h-full"
          }
        >
          {/* MAP CONTAINER */}
          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
            <iframe
              src={mapSource}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen={true}
              className={`w-full h-full transition-all duration-1000 ease-in-out ${
                isExpanded
                  ? "grayscale-0 scale-100"
                  : "grayscale-[0.9] contrast-[1.2] invert-[0.93] hue-rotate-[180deg] opacity-60 scale-110"
              }`}
            ></iframe>
          </div>

          {/* Luxury Control Button */}
          <div className="absolute top-10 right-10 z-[10000]">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="group flex items-center gap-4 bg-[#C59D5F] text-black px-8 py-4 font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl transition-all duration-300 hover:bg-white active:scale-90"
            >
              {isExpanded ? (
                <>
                  {" "}
                  <FaCompressArrowsAlt size={14} />{" "}
                  {t.close_map || "Close"}{" "}
                </>
              ) : (
                <>
                  {" "}
                  <FaExpandArrowsAlt size={14} />{" "}
                  {t.expand_map || "View Location"}{" "}
                </>
              )}
            </button>
          </div>

          {/* Info Badge - Traffic Law Service */}
          {!isExpanded && (
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-12 left-12 z-20 bg-[#070707]/95 backdrop-blur-xl border-l-4 border-[#C59D5F] p-8 max-w-[350px] shadow-[20px_20px_60px_rgba(0,0,0,0.8)]"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[#C59D5F] text-[10px] font-black tracking-[0.5em] uppercase">
                  Premium Service
                </span>
              </div>
              <h3 className="text-white font-serif italic text-2xl mb-3 tracking-wide">
                Traffic Law
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light tracking-wide">
                Toshkent shahri, Yunusobod tumani, <br />
                Amir Temur ko'chasi, 108-uy. <br />
                <span className="text-[#C59D5F]/60 mt-2 block text-[12px] font-medium italic">
                  Mo'ljal: Minor metrosi yaqinida
                </span>
              </p>
            </motion.div>
          )}

          {/* Aesthetic Overlays */}
          {!isExpanded && (
            <>
              {/* Dark Vignette */}
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.9)] z-10" />
              {/* Center Marker Hint (Optional visual cue) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div className="w-4 h-4 border border-[#C59D5F]/20 rounded-full animate-ping" />
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
