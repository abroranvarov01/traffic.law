"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/shared/ui/Container/Container";
import { FaFilePdf, FaChevronDown } from "react-icons/fa";

const faqData = [
  {
    title: "AENEAN VESTIBULUM",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "LIGULA LUCTUS MAURIS",
    content: "Phasellus praesent etiam placerat semper dui a penatbus.",
  },
  {
    title: "TRISTIQUE LACINIA SED",
    content: "Convallis quam praesent mattis mi consequat laoreet odio.",
  },
  {
    title: "QUAM JUSTO TORQUENT",
    content: "Faucibus ad dis sem sociosqu ullamcorper magna sociis.",
  },
  {
    title: "FEUGIAT NASCETUR MONTES",
    content: "Dignissim commodo penatibus ut arcu laoreet accumsan.",
  },
];

const recentPosts = [
  { title: "WHAT WE ARE CAPABLE OF GETS DISCOVERED.", date: "May 20, 2021" },
  {
    title: "IN ON ANNOUNCING IF OF COMPARISON PIANOFORTE",
    date: "May 20, 2021",
  },
  {
    title: "SOMETHING CONSULTED AGE EXTREMELY END PROCURING",
    date: "May 20, 2021",
  },
];

export const ServiceDetail = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* --- LEFT CONTENT AREA --- */}
          <div className="lg:col-span-8">
            <div className="mb-10">
              <span className="text-[#C59D5F] text-[10px] font-bold uppercase tracking-[0.4em] italic mb-2 block">
                Description
              </span>
              <h2 className="text-4xl font-serif text-[#1a1612] italic mb-8">
                About Domestic Violence
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-500 text-[14px] leading-relaxed italic">
                <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia accusantium odio quis laboriosam dolorem nam veritatis. Delectus eius dolor aliquam odit ducimus sunt minima culpa, doloremque, ullam aspernatur illum dicta provident est voluptatum fugit nam adipisci neque ad repellendus corporis voluptas! Vero nobis quibusdam excepturi rem. Accusamus autem ratione consequatur maxime possimus, eligendi iste esse cum ex quis quam cupiditate sapiente ab 
                </p>
                <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate, laboriosam soluta. Excepturi nihil, quas porro, ipsum, earum consequatur commodi itaque minus dolores debitis a sed veniam aliquid enim ex. Unde voluptatem iste soluta. Veritatis architecto assumenda, atque perferendis tempora deleniti delectus incidunt impedit, facilis blanditiis, officia modi eveniet pariatur deserunt ut. Facere nam natus rerum voluptas hic iure, accusantium, 
                </p>
              </div>
            </div>

            {/* Image & FAQ Block */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mt-16">
              {/* Rasm - Border Radius bilan */}
              <div className="relative h-[450px] w-full border-l-[10px] border-[#C59D5F] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/suits.jpg"
                  alt="Criminal Case"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Akvordeon - Transition bilan */}
              <div>
                <span className="text-[#C59D5F] text-[10px] font-bold uppercase tracking-[0.4em] italic mb-1 block">
                  Crime Law
                </span>
                <h3 className="text-2xl font-serif text-[#1a1612] italic mb-6">
                  Criminal Case
                </h3>

                <div className="space-y-2">
                  {faqData.map((item, index) => (
                    <div key={index} className="overflow-hidden rounded-lg">
                      <button
                        onClick={() =>
                          setActiveFaq(activeFaq === index ? null : index)
                        }
                        className={`w-full flex items-center justify-between p-4 transition-all duration-300 ${
                          activeFaq === index
                            ? "bg-[#C59D5F] text-black"
                            : "bg-[#1a120b] text-white hover:bg-[#C59D5F]/10"
                        }`}
                      >
                        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-left">
                          {item.title}
                        </span>
                        <motion.div
                          animate={{ rotate: activeFaq === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FaChevronDown className="text-[10px]" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {activeFaq === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="bg-[#241e19]"
                          >
                            <div className="p-4 text-xs text-gray-400 italic leading-relaxed border-t border-white/5">
                              {item.content}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDEBAR --- */}
          <div className="lg:col-span-4 space-y-12">
            <div>
              <h4 className="text-xl font-serif text-[#1a1612] italic mb-8">
                Recent Posts
              </h4>
              <div className="space-y-6">
                {recentPosts.map((post, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-100 p-6 rounded-xl hover:shadow-xl transition-all duration-300 bg-gray-50/30 group"
                  >
                    <h5 className="text-[13px] font-bold text-[#1a1612] leading-snug mb-2 group-hover:text-[#C59D5F] transition-colors">
                      {post.title}
                    </h5>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-4">
                      oneprozury4 | {post.date}
                    </p>
                    <a
                      href="#"
                      className="text-[#C59D5F] text-[10px] font-bold italic uppercase tracking-widest"
                    >
                      Read More »
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-serif text-[#1a1612] italic mb-8">
                Our Brochures
              </h4>
              <div className="space-y-3">
                {["Practice Areas.PDF", "Related Law .PDF"].map((file, i) => (
                  <button
                    key={i}
                    className="w-full bg-[#C59D5F] hover:bg-[#1a120b] text-black hover:text-[#C59D5F] flex items-center justify-between px-6 py-4 transition-all rounded-lg group shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <FaFilePdf className="text-lg" />
                      <span className="text-xs font-bold tracking-widest uppercase">
                        {file}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
