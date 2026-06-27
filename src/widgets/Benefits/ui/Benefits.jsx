"use client";
import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/shared/ui/Container/Container";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";

const Benefits = () => {
  const benefitsList = [
    "Egestas erat volutpat",
    "Primis nisi fusce",
    "Coquat risque auctor",
    "Rurum natoue tristue",
    "Condentum scelerque",
    "Porta ridiculus",
  ];

  return (
    // -mt-[150px] orqali tepaga yopishtirdik, relative z-20 ustiga chiqishini ta'minlaydi
    <section className="relative z-20 -mt-[25px] lg:-mt-[130px] w-full pt-3  bg-[#14110e]  lg:pt-20 overflow-hidden">
      {/* 1. Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/womanbg.png"
          alt="Benefits Background"
          fill
          className="object-contain "
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#14110e] via-[#14110e]/80 to-transparent" />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Chap qism: Matnlar */}
          <div className="w-full lg:w-1/2">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-[#C59D5F] text-[12px] font-bold tracking-[0.3em] uppercase mb-4 block"
            >
              Our Benefits
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight uppercase"
            >
              Why Choose <br /> Our Lawyers?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-gray-400 text-sm mb-8 max-w-lg leading-relaxed"
            >
              Lorem ipsum dolor sit amet consectetur adipiscing elit massa
              sapien aliquet fames pulvinar augue turpis gravida conubia.
            </motion.p>

            {/* Checkmarks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefitsList.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 group"
                >
                  <FaCheckCircle className="text-[#C59D5F] text-lg group-hover:scale-110 transition-transform" />
                  <span className="text-white/80 text-[13px] uppercase tracking-wider">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* O'ng qism: Rasm - Margin va paddinglar minimal qilindi */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-10 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="relative w-full max-w-[450px] h-[350px] md:h-[550px]"
            >
              <Image
                src="/lawho06.png.png"
                alt="Professional Lawyer"
                fill
                className="object-contain object-bottom"
              />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Benefits;
