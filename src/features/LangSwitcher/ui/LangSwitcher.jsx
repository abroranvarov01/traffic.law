"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const LangSwitcher = ({ currentLang }) => {
  const pathname = usePathname();

  // /uz/services -> /ru/services ga aylantirish mantiqi
  const getRedirectPath = (locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale; // birinchi segmentni (tilni) yangilaymiz
    return segments.join("/");
  };

  const languages = [
    { code: "uz", label: "O'z" },
    { code: "ru", label: "Ru" },
    { code: "en", label: "En" },
  ];

  return (
    <div className="flex items-center gap-2 border-l border-gray-700 pl-4 ml-4">
      {languages.map((lang) => (
        <Link
          key={lang.code}
          href={getRedirectPath(lang.code)}
          className={`text-sm font-medium transition-colors ${
            currentLang === lang.code
              ? "text-amber-500 underline underline-offset-4"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {lang.label}
        </Link>
      ))}
    </div>
  );
};