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
];

// styles
import ObjectiveStyles from "./objective.module.css";

// components
import HeadingPair from "@/app/components/headingPair";
import Features from "./components/features";

// image
import Image from "next/image";
import YourOneVoiceImage from "../../../../../public/images/youronevoice.png";

export default function Objective() {
  return (
    <section
      id="objective"
      className={`block ${ObjectiveStyles.section}`}
    >
      <div className={ObjectiveStyles.continaer}>
        <div className={ObjectiveStyles.textbox}>
          <HeadingPair
            className={ObjectiveStyles.heading}
            tertiary="Paid Lesson Objective"
            heading="Our collaborative goals"
          />
          <Features features={features} />
        </div>
        <Image
          className={ObjectiveStyles.image}
          src={YourOneVoiceImage}
          alt="Your One Voice discord server channel structure"
          placeholder="blur"
          blurDataURL={"../../../../../public/images/youronevoice.png"}
        />
      </div>
    </section>
  );
}
