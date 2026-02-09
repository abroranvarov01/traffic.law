"use client";
import React from "react";
import Image from "next/image";
import { Container } from "@/shared/ui/Container/Container";

// Swiper importlari
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Swiper CSS lari (Bularsiz swiper ishlamaydi yoki buzilib ketadi)
import "swiper/css";
import "swiper/css/autoplay";

export const Partners = ({ dict }) => {
  // JSON ma'lumotlari
  const partnersList = dict?.partners || [];

  return (
    <section className="bg-[#070707] py-10 border-y border-white/5 overflow-hidden">
      <Container>
        <Swiper
          modules={[Autoplay]}
          // Uzluksiz oqim effekti uchun sozlamalar:
          loop={true}
          speed={4000} // Harakatlanish tezligi (millisekundda)
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true, // Sichqoncha borganda to'xtash
          }}
          // O'tish effekti silliq bo'lishi uchun
          allowTouchMove={true}
          slidesPerView={2}
          spaceBetween={30}
          breakpoints={{
            // Mobil (320px dan yuqori)
            320: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            // Planshet (768px dan yuqori)
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            // Desktop (1024px dan yuqori)
            1024: {
              slidesPerView: 5,
              spaceBetween: 60,
            },
          }}
          // CSS class - silliq harakat uchun (linear)
          className="partners-swiper"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {partnersList.map((partner, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center"
            >
              <div className="relative flex justify-center items-center group cursor-pointer w-full">
                <div
                  className="relative transition-all duration-500 opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0"
                  style={{
                    width: partner.width ? `${partner.width}px` : "130px",
                    height: "50px",
                  }}
                >
                  <Image
                    src={partner.image}
                    alt={partner.name || "Partner"}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>

      {/* Silliq (linear) harakat uchun CSS */}
      <style jsx global>{`
        .partners-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
    </section>
  );
};
