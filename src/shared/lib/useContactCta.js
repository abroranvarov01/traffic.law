"use client";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

/**
 * "Konsultatsiya olish" tugmalari uchun yagona xatti-harakat.
 *
 * Sahifada #contact bloki bo'lsa (bosh sahifa, /contact) - unga silliq scroll,
 * aks holda /{lang}/contact sahifasiga o'tish. Ilgari tugmalar faqat scroll
 * qilgani uchun boshqa sahifalarda umuman ishlamay qolgan edi.
 */
export const useContactCta = (lang) => {
  const router = useRouter();

  return useCallback(() => {
    const section = document.getElementById("contact");

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      return;
    }

    router.push(`/${lang}/contact`);
  }, [lang, router]);
};
