import "server-only";

// Har bir til uchun ikkita hujjat (maxfiylik siyosati + foydalanish shartnomasi)
// dinamik ravishda yuklanadi — getDictionary bilan bir xil pattern.
const loaders = {
  ru: () =>
    Promise.all([
      import("../content/privacy.ru.json"),
      import("../content/agreement.ru.json"),
    ]),
  uz: () =>
    Promise.all([
      import("../content/privacy.uz.json"),
      import("../content/agreement.uz.json"),
    ]),
  en: () =>
    Promise.all([
      import("../content/privacy.en.json"),
      import("../content/agreement.en.json"),
    ]),
};

export const getLegalDocs = async (locale) => {
  const load = loaders[locale] || loaders.uz;
  const [privacy, agreement] = await load();

  return {
    privacy: privacy.default,
    agreement: agreement.default,
  };
};
