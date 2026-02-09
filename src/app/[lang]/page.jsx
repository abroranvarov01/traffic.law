import { getDictionary, i18n } from "@/dictionaries/getDictionary";
import { About } from "@/widgets/About";
import { Appointment } from "@/widgets/Appointment";
import { AppSection } from "@/widgets/AppSection";
import { Benefits } from "@/widgets/Benefits";
import { ContactSection } from "@/widgets/ContactSection";
import { ExperienceSlider } from "@/widgets/ExperienceSlider";
import { Hero } from "@/widgets/Hero";
import { News } from "@/widgets/News";
import { NewsSection } from "@/widgets/News/ui/News";
import { OurWorks } from "@/widgets/OurWorks/ui/OurWorks";
import { Partners } from "@/widgets/Partners";
import { Services } from "@/widgets/Services";
import { Statistics } from "@/widgets/Statistics";
import { Team } from "@/widgets/Team";
import { Testimonials } from "@/widgets/Testimonials";
import { Timeline } from "@/widgets/Timeline";
import { WhyChooseUs } from "@/widgets/WhyChooseUs";

export default async function Home({ params }) {
  let currentParams = params;
  if (typeof params.then === "function") {
    currentParams = await params;
  }

  let lang = currentParams.lang;

  // 2. Lang aniqlash mantiqi
  if (!lang && currentParams.value) {
    try {
      const parsedValue = JSON.parse(currentParams.value);
      lang = parsedValue.lang;
    } catch (e) {
      console.error("Language parsing error:", e);
    }
  }

  if (!lang) {
    lang = i18n.defaultLocale;
  }

  // 3. Dictionary-ni yuklash
  const dict = await getDictionary(lang);

  console.log(dict);

  return (
    <>
      <Hero dict={dict} lang={lang} />

      <About dict={dict} lang={lang} />
      <OurWorks dict={dict} lang={lang} />

      <Partners dict={dict} lang={lang} />
      <WhyChooseUs dict={dict} lang={lang} />

      <Testimonials dict={dict} lang={lang} />
      <Services dict={dict} lang={lang} />
      <Team dict={dict} lang={lang} />
      <AppSection dict={dict} lang={lang} />
      <NewsSection dict={dict} lang={lang} />
      <ContactSection dict={dict} lang={lang} />

      {/* <Benefits /> */}
      {/* <Timeline /> */}
      {/* <Statistics /> */}
      {/* <Appointment /> */}
      {/* <ExperienceSlider /> */}
      {/* <News /> */}
    </>
  );
}
