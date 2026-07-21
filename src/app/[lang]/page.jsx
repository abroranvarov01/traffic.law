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

      <div id="about" className="scroll-mt-24">
        <About dict={dict} lang={lang} />
      </div>
      <div id="works" className="scroll-mt-24">
        <OurWorks dict={dict} lang={lang} />
      </div>

      <Partners dict={dict} lang={lang} />
      <div id="why" className="scroll-mt-24">
        <WhyChooseUs dict={dict} lang={lang} />
      </div>

      <div id="testimonials" className="scroll-mt-24">
        <Testimonials dict={dict} lang={lang} />
      </div>
      <div id="services" className="scroll-mt-24">
        <Services dict={dict} lang={lang} />
      </div>
      <div id="team" className="scroll-mt-24">
        <Team dict={dict} lang={lang} />
      </div>
      <AppSection dict={dict} lang={lang} />
      <div id="news" className="scroll-mt-24">
        <NewsSection dict={dict} lang={lang} />
      </div>
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
