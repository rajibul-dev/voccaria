import About from "./sections/about/about"
import Socials from "./sections/socials/socials"
import Patreon from "./sections/patreon/patreon"
import Objective from "./sections/objective/objective"
import LessonOptions from "./sections/lesson-options/lessonOptions"

export default function Mia() {
  return (
    <main>
      <About />
      <Socials />
      <Patreon />
      <Objective />
      <LessonOptions />
    </main>
  )
}
