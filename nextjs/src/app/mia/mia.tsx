import About from "./sections/about/about";
import Socials from "./sections/socials/socials";
import Patreon from "./sections/patreon/patreon";
import Objective from "./sections/objective/objective";
import LessonOptions from "./sections/lesson-options/lessonOptions";
import Pricing from "./sections/pricing/pricing";
import Scheduling from "./sections/scheduling/scheduling";
import Contact from "./sections/contact/contact";

export default function Mia() {
  return (
    <main>
      <About />
      <Socials />
      <Patreon />
      <Objective />
      <LessonOptions />
      <Pricing />
      <Scheduling />
      <Contact />
    </main>
  );
}
