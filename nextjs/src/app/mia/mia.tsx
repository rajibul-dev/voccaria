import About from "./sections/about/about";
import Socials from "./sections/socials/socials";
import Patreon from "./sections/patreon/patreon";
import PaidObjective from "./sections/paid-objective/paid-objective";
import LessonOptions from "./sections/lesson-options/lessonOptions";
import Pricing from "./sections/pricing/pricing";
import Scheduling from "./sections/scheduling/scheduling";
import Contact from "./sections/contact/contact";
import Testimonials from "./sections/testimonials/testimonials";
import Navbar from "./navbar/navbar";
import BackToTop from "../components/back-to-top";
import Mission from "./sections/mission/mission";
import SeoPurposeH1 from "./sections/seo-purpose-h1/seo-purpose-h1";

export default function Mia() {
  return (
    <>
      <main>
        <SeoPurposeH1 />
        <Navbar />
        <About />
        <Socials />
        <Patreon />
        <Mission />
        <PaidObjective />
        <LessonOptions />
        <Pricing />
        <Scheduling />
        <Contact />
        <Testimonials />
      </main>
      <BackToTop />
    </>
  );
}
