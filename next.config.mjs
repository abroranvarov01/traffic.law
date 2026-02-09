/** @type {import('next').NextConfig} */
const nextConfig = {
  // Docker uchun build hajmini 10 barobargacha kamaytiradi
  output: "standalone",

  // Rasmlarni optimallashtirish sozlamalari
  images: {
    formats: ["image/avif", "image/webp"], // Zamonaviy va yengil formatlar
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Faqat kerakli o'lchamlarni generatsiya qilish
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60, // Keshda saqlash vaqti (soniya)
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Xavfsizlik sarlavhalarini qo'shish (SEO va Security uchun)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },

  // Ishlab chiqarishda source-map'larni o'chirish (Build tezligi uchun)
  productionBrowserSourceMaps: false,
};

export default nextConfig;
