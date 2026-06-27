const BASE_URL = "https://traffic.law";

const languages = ["uz", "ru", "en"];

const routes = [
  { path: "", frequency: "weekly", priority: 1 },
  { path: "/about", frequency: "monthly", priority: 0.8 },
  { path: "/case", frequency: "weekly", priority: 0.9 },
  { path: "/case-details", frequency: "monthly", priority: 0.8 },
  { path: "/contact", frequency: "monthly", priority: 0.8 },
  { path: "/faq", frequency: "monthly", priority: 0.8 },
  { path: "/service", frequency: "weekly", priority: 0.9 },
  { path: "/team", frequency: "monthly", priority: 0.8 },
  { path: "/team-details", frequency: "monthly", priority: 0.8 },
  { path: "/testimonials", frequency: "monthly", priority: 0.7 },
];

function localizedUrl(language, path) {
  return `${BASE_URL}/${language}${path}`;
}

export default function sitemap() {
  return routes.flatMap(({ path, frequency, priority }) =>
    languages.map((language) => ({
      url: localizedUrl(language, path),
      changeFrequency: frequency,
      priority,
      alternates: {
        languages: {
          uz: localizedUrl("uz", path),
          ru: localizedUrl("ru", path),
          en: localizedUrl("en", path),
        },
      },
    }))
  );
}
