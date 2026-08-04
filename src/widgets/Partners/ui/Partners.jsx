"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Container } from "@/shared/ui/Container/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";

// Общий бокс, в который вписывается каждый логотип
const BOX_W = 150;
const BOX_H = 48;
// 0 — все логотипы одной высоты, 0.5 — все одной площади. Промежуточное значение
// не даёт квадратным логотипам казаться крупнее, а вытянутым — теряться.
const BALANCE = 0.42;
const FALLBACK_RATIO = 3;

// Размер в процентах от бокса, чтобы логотипы сжимались вместе с ним на мобильных
const getLogoSize = (ratio) => {
  const r = ratio || FALLBACK_RATIO;
  let height = BOX_H / Math.pow(r, BALANCE);
  let width = height * r;

  if (width > BOX_W) {
    width = BOX_W;
    height = width / r;
  }
  if (height > BOX_H) {
    height = BOX_H;
    width = height * r;
  }

  return {
    width: `${(width / BOX_W) * 100}%`,
    height: `${(height / BOX_H) * 100}%`,
  };
};

export const Partners = ({ dict }) => {
  const [ratios, setRatios] = useState({});
  const basePartners = dict?.partners || [];
  const sources = basePartners.map((partner) => partner.image).join(",");

  // Пропорции берём из самих файлов, чтобы размеры не пришлось держать в словарях
  useEffect(() => {
    let cancelled = false;

    sources
      .split(",")
      .filter(Boolean)
      .forEach((src) => {
        const probe = new window.Image();
        probe.onload = () => {
          if (cancelled || !probe.naturalHeight) return;
          setRatios((prev) =>
            prev[src] ? prev : { ...prev, [src]: probe.naturalWidth / probe.naturalHeight }
          );
        };
        probe.src = src;
      });

    return () => {
      cancelled = true;
    };
  }, [sources]);

  const partnersList = basePartners.length
    ? Array.from({ length: Math.ceil(15 / basePartners.length) }, () => basePartners).flat()
    : [];

  return (
    <section className="bg-[#070707] py-10 border-y border-white/5 overflow-hidden">
      <Container>
        <Swiper
          modules={[Autoplay]}
          loop={true}
          loopAdditionalSlides={2}
          speed={4000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          allowTouchMove={true}
          slidesPerView={2}
          spaceBetween={30}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 40 },
            1024: { slidesPerView: 5, spaceBetween: 60 },
          }}
          className="partners-swiper"
        >
          {partnersList.map((partner, index) => (
            <SwiperSlide
              key={`${partner.id ?? partner.name}-${index}`}
              className="!flex items-center justify-center"
            >
              {/* Единый бокс под все слайды */}
              <div className="group flex w-full items-center justify-center cursor-pointer px-2">
                <div className="relative flex w-full max-w-[150px] aspect-[150/48] items-center justify-center">

                  {/* Размер логотипа считается от его пропорций, а не от размера файла */}
                  <div
                    className="relative transition-all duration-500 opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0"
                    style={getLogoSize(ratios[partner.image])}
                  >
                    <Image
                      src={partner.image}
                      alt={partner.name || "Partner"}
                      fill
                      sizes="150px"
                      className="object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>

      <style jsx global>{`
        .partners-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
    </section>
  );
};