"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/shared/ui/Container/Container";
import { MdKeyboardArrowDown } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { GoldButton } from "@/shared/ui/GoldButton/GoldButton";

export const Navbar = ({ dict, lang }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);

  const pathname = usePathname();
  const t = dict?.navbar || {};

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobil menyu ochilganda skrollni to'xtatish
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const navLinks = [
    { name: t.home || "Главная", path: `/${lang}` },
    { name: t.about || "О нас", path: `/${lang}/about` },
    { name: t.case || "Кейсы", path: `/${lang}/case` },
    { name: t.services || "Услуги", path: `/${lang}/service` },
    { name: t.reviews || "Отзывы", path: `/${lang}/testimonials` },
    { name: t.news || "Новости", path: `/${lang}/news` },
    { name: t.contact || "Контакты", path: `/${lang}/contact` },
  ];

  const languages = [
    { code: "ru", name: "Ru" },
    { code: "uz", name: "Uz" },
    { code: "en", name: "En" },
  ];

  const currentLang = languages.find((l) => l.code === lang) || languages[0];

  const getRedirectPath = (targetLang) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = targetLang;
    return segments.join("/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${
        scrolled
          ? "bg-black/95 py-4 shadow-2xl backdrop-blur-md"
          : "bg-transparent py-8"
      }`}
    >
      <Container className="flex items-center justify-between">
        {/* Logo Section - O'lchamlar qat'iy belgilandi */}
        <Link href={`/${lang}`} className="relative z-[110] flex-shrink-0">
          <div className="relative w-[120px] h-[30px] md:w-[150px] md:h-[30px]">
            <Image
              src="/news/logo.png"
              alt="Traffic Law Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-10">
          <ul className="flex items-center gap-4 xl:gap-8 flex-shrink-0">
            {navLinks.map((link, idx) => {
              const isActive = pathname === link.path;
              return (
                <li key={idx} className="flex-shrink-0">
                  <Link
                    href={link.path}
                    className={`text-[11px] font-bold uppercase tracking-[0.12em] transition-all duration-500 relative py-2 group ${
                      isActive ? "text-white" : "text-white/50 hover:text-white"
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute bottom-0 left-0 h-[1px] bg-[#C59D5F] transition-all duration-500 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Lang Switcher - Matn siqilmasligi uchun pl-6 */}
          <div className="relative border-l border-white/10 pl-6 flex-shrink-0">
            <button
              onClick={() => setLangDropdown(!langDropdown)}
              className="flex items-center gap-1.5 text-white/80 hover:text-white transition-all uppercase text-[11px] font-black tracking-widest"
            >
              {currentLang.name}
              <MdKeyboardArrowDown
                className={`text-lg transition-transform duration-500 ${langDropdown ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {langDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="absolute top-full right-0 mt-5 bg-[#0f0f0f] border border-white/5 p-2 rounded-sm shadow-2xl min-w-[80px]"
                >
                  {languages.map((l) => (
                    <Link
                      key={l.code}
                      href={getRedirectPath(l.code)}
                      onClick={() => setLangDropdown(false)}
                      className="block px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/5"
                    >
                      {l.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CTA Button */}
          <Link
            href={`/${lang}/contact`}
            className="px-6 xl:px-8 py-4 border border-white/20 bg-white/5 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500 flex-shrink-0"
          >
            {t.cta || "поговорить с юристом"}
          </Link>
        </div>

        {/* Mobile Burger - Ideal X animatsiyasi */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden w-10 h-10 flex flex-col justify-center items-center relative z-[110]"
        >
          <div className="relative w-6 h-5">
            <motion.span
              animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
              className="absolute top-0 left-0 w-full h-[2px] bg-white block"
            />
            <motion.span
              animate={isOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
              className="absolute top-[9px] right-0 w-2/3 h-[2px] bg-white block"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
              className="absolute bottom-0 left-0 w-full h-[2px] bg-white block"
            />
          </div>
        </button>
      </Container>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 h-screen w-full bg-[#070707] z-[105] flex flex-col lg:hidden"
          >
            {/* Sidebar BG Decor */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-[#C59D5F] blur-[150px] rounded-full" />
            </div>

            <div className="flex justify-between items-center p-8 border-b border-white/5"></div>

            <div className="flex flex-col p-10 gap-8 overflow-y-auto">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * idx }}
                >
                  <Link
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-serif italic text-white hover:text-[#C59D5F] transition-all flex items-center gap-4"
                  >
                    <span className="text-[10px] not-italic font-sans text-[#C59D5F] opacity-50">
                      0{idx + 1}
                    </span>
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <div className="flex gap-4 mt-6">
                {languages.map((l) => (
                  <Link
                    key={l.code}
                    href={getRedirectPath(l.code)}
                    onClick={() => setIsOpen(false)}
                    className={`text-xs font-black uppercase tracking-widest ${lang === l.code ? "text-[#C59D5F]" : "text-white/30"}`}
                  >
                    {l.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-auto p-10 border-t border-white/5">
              <Link
                href={`/${lang}/contact`}
                onClick={() => setIsOpen(false)}
                className="block w-full"
              >
                <GoldButton className="w-full !py-6 ">
                  {t.cta || "поговорить с юристом"}
                </GoldButton>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
