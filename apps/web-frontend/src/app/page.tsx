import About from "./_landing/sections/about/about";
import Socials from "./_landing/sections/socials/socials";
import Patreon from "./_landing/sections/patreon/patreon";
import PaidObjective from "./_landing/sections/paid-objective/paid-objective";
import LessonOptions from "./_landing/sections/lesson-options/lessonOptions";
import Pricing from "./_landing/sections/pricing/pricing";
import Scheduling from "./_landing/sections/scheduling/scheduling";
import Contact from "./_landing/sections/contact/contact";
import Testimonials from "./_landing/sections/testimonials/testimonials";
// import BackToTop from "./_old-components/back-to-top";
import Mission from "./_landing/sections/mission/mission";
import SeoPurposeH1 from "./_landing/sections/seo-purpose-h1/seo-purpose-h1";
import OldFooter from "./_old-components/old-footer";

export default function Page() {
  return (
    <>
      <main className="bg-white min-[450px]:pb-[12rem]">
        <SeoPurposeH1 />
        <About />
        <Socials />
        <Mission />
        <PaidObjective />
        <LessonOptions />
        <Pricing />
        <Scheduling />
        <Contact />
        <Testimonials />
        <Patreon />
      </main>
      <OldFooter />
      {/* <BackToTop /> */}
    </>
  );
}
