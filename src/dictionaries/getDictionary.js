import "server-only";

const dictionaries = {
  ru: () => import("./ru.json").then((module) => module.default),
  uz: () => import("./uz.json").then((module) => module.default),
  en: () => import("./en.json").then((module) => module.default),
};

export const getDictionary = async (locale) => {
  const loadDictionary = dictionaries[locale];

  if (loadDictionary) {
    return loadDictionary();
  } else {
    return dictionaries["uz"]();
  }
};

export const i18n = {
  locales: ["uz", "ru", "en"],
  defaultLocale: "uz",
};
