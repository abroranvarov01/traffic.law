import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as motion from "framer-motion/client";
import { FiCalendar, FiEye, FiArrowLeft, FiAlertTriangle } from "react-icons/fi";
import { Container } from "@/shared/ui/Container/Container";
import { getDictionary, i18n } from "@/dictionaries/getDictionary";

export async function generateStaticParams() {
  // 3 ta yangilik uchun sahifalarni oldindan generatsiya qilish
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export async function generateMetadata({ params }) {
  const { lang, id } = await params;
  const dict = await getDictionary(lang);
  const item = dict?.news?.items?.[Number(id) - 1];

  if (!item) return {};

  return {
    title: `${item.title} | Traffic Law`,
    description: item.desc,
    alternates: {
      canonical: `https://traffic.law/${lang}/news/${id}`,
    },
    openGraph: {
      title: item.title,
      description: item.desc,
      images: [`/news/card-${id}.jpg`],
    },
  };
}

export default async function NewsArticlePage({ params }) {
  const currentParams = await params;
  let lang = currentParams.lang || i18n.defaultLocale;
  const id = currentParams.id;

  const dict = await getDictionary(lang);
  const news = dict?.news || {};
  const items = news.items || [];
  const index = Number(id) - 1;
  const item = items[index];

  // Noto'g'ri id bo'lsa 404
  if (!item || Number.isNaN(index) || index < 0) {
    notFound();
  }

  const labels = news.labels || {};
  const content = item.content || {};
  const sections = content.sections || [];

  // Boshqa yangiliklar ("Ещё новости")
  const others = items
    .map((it, i) => ({ ...it, id: i + 1 }))
    .filter((_, i) => i !== index);

  return (
    <main className="bg-[#070707] min-h-screen text-white">
      {/* --- 1. Hero (Obложка) --- */}
      <section className="relative h-[420px] md:h-[560px] w-full flex items-end overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <Image
            src={`/news/card-${id}.jpg`}
            alt={item.title}
            fill
            priority
            className="object-cover object-center"
          />
          {/* Premium gradient — pastdan matn o'qilishi uchun */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/70 to-[#070707]/30" />
        </div>

        <Container className="relative z-10 pb-12 md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <Link
              href={`/${lang}`}
              className="inline-flex items-center gap-2 text-[#C59D5F] text-[10px] md:text-[11px] font-bold tracking-[0.3em] uppercase mb-6 hover:text-white transition-colors"
            >
              <FiArrowLeft /> {labels.back || news.view_all}
            </Link>

            <span className="block text-[#C59D5F] text-[10px] md:text-[12px] font-bold tracking-[0.4em] uppercase mb-4">
              • {news.subtitle} •
            </span>

            <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif italic leading-tight tracking-wide mb-6">
              {item.title}
            </h1>

            <div className="flex items-center gap-6 text-[#888] text-[11px] md:text-xs uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <FiCalendar className="text-[#C59D5F]" />
                <span>{item.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiEye className="text-[#C59D5F]" />
                <span>{item.views}</span>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* --- 2. Maqola matni --- */}
      <article className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Lead */}
            {content.lead && (
              <p className="text-white text-base md:text-lg font-light italic leading-relaxed border-l-2 border-[#C59D5F] pl-6 py-1 mb-12 md:mb-16">
                {content.lead}
              </p>
            )}

            {/* Bo'limlar */}
            <div className="space-y-10 md:space-y-12">
              {sections.map((sec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-lg md:text-2xl font-serif text-[#C59D5F] tracking-wide mb-4">
                    {sec.heading}
                  </h2>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
                    {sec.text}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Xulosa */}
            {content.conclusion && (
              <p className="text-gray-300 text-base md:text-lg leading-relaxed font-light mt-12 md:mt-16 pt-10 border-t border-white/5">
                {content.conclusion}
              </p>
            )}

            {/* Disclaimer */}
            {news.disclaimer?.note && (
              <div className="mt-14 bg-black/30 border border-white/5 p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center rounded-sm">
                <FiAlertTriangle className="text-4xl text-[#C59D5F] shrink-0" />
                <div>
                  <h3 className="text-[10px] font-bold text-gray-500 tracking-[0.3em] uppercase mb-2">
                    {labels.disclaimerTitle || news.disclaimer.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 italic leading-relaxed">
                    {news.disclaimer.note}
                  </p>
                </div>
              </div>
            )}
          </div>
        </Container>
      </article>

      {/* --- 3. Ещё новости --- */}
      {others.length > 0 && (
        <section className="relative bg-[#0a0a0a] py-16 md:py-24 border-t border-white/5 overflow-hidden">
          <div className="absolute top-1/2 -left-20 w-[400px] h-[400px] bg-[#C59D5F]/5 blur-[80px] rounded-full pointer-events-none" />
          <Container className="relative z-10">
            <div className="flex items-center gap-3 mb-12 md:mb-16">
              <span className="w-1.5 h-1.5 bg-[#C59D5F] rotate-45" />
              <h2 className="text-[#C59D5F] text-[11px] md:text-[13px] font-black tracking-[0.4em] uppercase">
                {labels.more || news.view_all}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {others.map((it) => (
                <Link
                  key={it.id}
                  href={`/${lang}/news/${it.id}`}
                  className="group flex flex-col h-full bg-[#111] border border-white/5 rounded-sm hover:border-[#C59D5F]/30 transition-colors duration-500 cursor-pointer shadow-xl"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden shrink-0">
                    <Image
                      src={`/news/card-${it.id}.jpg`}
                      alt={it.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-transparent opacity-80" />
                  </div>
                  <div className="flex flex-col flex-grow p-6 md:p-8">
                    <h3 className="text-base md:text-lg font-serif leading-snug mb-4 group-hover:text-[#C59D5F] transition-colors duration-300 line-clamp-2">
                      {it.title}
                    </h3>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-6 line-clamp-3">
                      {it.desc}
                    </p>
                    <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between text-[#555] text-[10px] md:text-[11px] uppercase tracking-widest">
                      <div className="flex items-center gap-2">
                        <FiCalendar className="text-[#C59D5F]" />
                        <span>{it.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiEye className="text-[#C59D5F]" />
                        <span>{it.views}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </main>
  );
}
