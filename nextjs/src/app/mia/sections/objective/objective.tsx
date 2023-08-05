// features
const features = [
  <>
    Together, we{`'`}ll develop the voice <strong>YOU</strong> desire in the
    quickest, healthiest way possible, equipping you with the tools necessary
    for safe, independent practice.
  </>,
  <>
    A tailored practice program will be designed for you during each lesson,
    complete with {`"`}homework{`"`} and a brief summary of areas to focus on.
    Practicing independently is as vital as learning alongside me!
  </>,
  <>
    Your progress will be monitored via the <strong>Your One Voice</strong>{" "}
    Discord server, where you{`'`}ll have a personalized category and channels
    suited to your needs. Each lesson is recorded and made accessible privately,
    allowing us to track your progress over time. (Alternative options are
    available if you prefer not to use Discord.)
  </>,
]

// styles
import Features from "./components/features"
import ObjectiveStyles from "./objective.module.css"

// components
import HeadingPair from "@/app/components/headingPair"

export default function Objective() {
  return (
    <section className={`block ${ObjectiveStyles.section}`} id="objective">
      <div className={`container`}>
        <div className={ObjectiveStyles.textbox}>
          <HeadingPair
            headingClassName={ObjectiveStyles.heading}
            tertiary="Objective"
            heading="Our Collaborative Goals"
          />
          <Features features={features} />
        </div>
      </div>
    </section>
  )
}
