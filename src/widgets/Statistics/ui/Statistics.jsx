"use client";
import React from "react";
import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { Container } from "@/shared/ui/Container/Container";
import Image from "next/image";

const Counter = ({ value, suffix = "" }) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000, bounce: 0 });

  React.useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  React.useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent =
          Intl.NumberFormat("en-US").format(latest.toFixed(0)) + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref}>0</span>;
};

const stats = [
  { label: "Completed Works", value: 192, suffix: "+", isDark: true },
  { label: "Contract Signed", value: 3210, suffix: "", isDark: false },
  { label: "Registered Cases", value: 260, suffix: "%", isDark: true },
  { label: "Trusted Clients", value: 100, suffix: "%", isDark: false },
];

const Statistics = () => {
  return (
    // -mt-[80px] orqali Benefits bo'limiga yaqinlashtirildi
    <section className="relative w-full bg-white py-12 lg:py-20 -mt-[60px] lg:-mt-[100px] z-30 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 ">
        <Image
          src="/cards.png"
          alt="Background Columns"
          fill
          className="object-cover object-center"
        />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col gap-10">
          {" "}
          {/* Gap kamaytirildi */}
          {/* Sarlavha qismi */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
            <div className="w-full lg:w-1/2">
              <span className="text-[#C59D5F] text-[11px] font-bold tracking-[0.3em] uppercase mb-3 block">
                Our Experiences
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-[#1a1612] uppercase leading-tight">
                Why Client <br className="hidden md:block" /> Choose Us?
              </h2>
            </div>
            <div className="w-full lg:w-1/2 lg:pb-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-400 text-[13px] leading-relaxed">
                <p>
                  Mi turpis imperdiet nulla feugiat magnis pellentesque
                  venenatis nec, primis litora quam purus.
                </p>
                <p>
                  Ante natoque sapien mollis, felis sociosqu pharetra hac varius
                  odio cursus. Natoque ut molestie.
                </p>
              </div>
            </div>
          </div>
          {/* Statistika kartalari - Shadow va Hover effektlar bilan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`p-10 lg:p-14 flex flex-col items-center justify-center text-center transition-all duration-500 hover:z-20 hover:scale-[1.03] ${
                  stat.isDark ? "bg-[#1a1612]" : "bg-[#C59D5F]"
                }`}
              >
                <h3
                  className={`text-4xl lg:text-5xl font-bold mb-3 ${
                    stat.isDark ? "text-white" : "text-[#1a1612]"
                  }`}
                >
                  <Counter value={stat.value} suffix={stat.suffix} />
                </h3>
                <p
                  className={`text-[11px] uppercase tracking-[0.2em] font-bold ${
                    stat.isDark ? "text-[#C59D5F]" : "text-white"
                  }`}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Statistics;
