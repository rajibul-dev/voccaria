import Image from "next/image";

// styles
import styles from "./mission.module.css";

// components
import HeadingPair from "@/app/_old-components/headingPair";
import { Essay } from "@/app/_old-components/essay";

// images
import lessonImage from "@/../../public/images/live-lesson.png";
import resourceImage from "@/../../public/images/resources.png";

export default function Mission() {
  return (
    <section id="mission" className={`section-block ${styles.section}`}>
      <div className={`old-container ${styles.container}`}>
        <HeadingPair
          tertiary="How we teach"
          heading="Free Learning, Real Transformation"
          isCentered
          moreMargin
          className={styles.heading}
        />

        <div className={styles.grid}>
          <Essay className={`${styles.textWrapper} ${styles.para1}`}>
            <Essay.Para>
              Before receiving formal pedagogical training, I learned from the
              internet and became well-acquainted with the online resources
              available for those unable to afford voice lessons. I understand
              the challenges of not having access to real-time, one-on-one
              guidance. My work is dedicated to{" "}
              <strong>providing FREE lessons</strong> without any gimmicks or
              attempts to sell a program. I have shared my unique approaches
              entirely free of charge on the{" "}
              <a
                className="inline-a"
                href="https://discord.com/invite/4Z5JKYPhTe"
                target="_blank"
                rel="noopener noreferrer"
              >
                Discord server I created
              </a>
              , which currently has over 8,000 members.
            </Essay.Para>
            <Essay.Para>
              My teaching method is straightforward—fewer mind tricks, more
              focus on anatomy, and direct instruction—providing the
              foundational tools to develop a professional voice quickly. I also
              guide you on exactly what and how to practice to achieve your
              goals as swiftly as possible.
            </Essay.Para>
          </Essay>

          <Image
            className={`${styles.image} ${styles.lessonImg}`}
            src={lessonImage}
            alt="Mia voice teacher one-on-one free lesson"
            placeholder="blur"
            blurDataURL="@/../../public/images/live-lesson.png"
            // sizes="(min-width: 1320px) calc(-3.27vw + 593px), (min-width: 900px) calc(37.25vw + 66px), (min-width: 640px) 495px, (min-width: 500px) calc(37.5vw + 263px), 83.89vw"
            priority
          />

          <Essay className={`${styles.textWrapper} ${styles.para2}`}>
            <Essay.Para>
              A wealth of free resources, including handpicked YouTube videos
              from across the web and text written by me, are well-organized and
              available for you to learn independently. You can always ask
              questions, submit recordings, and receive feedback at no cost.
              There
              {`'`}s a practice routine suitable for both beginners and advanced
              students, along with homework channels featuring specific
              instructions for submitting your attempts, ensuring everything
              progresses smoothly—from posture and breathing to mixing and range
              extension exercises.
            </Essay.Para>
            <Essay.Para>
              I do not withhold any information, whether you participate in free
              or paid lessons. The paid lessons offer greater personalization
              due to the additional time available.
            </Essay.Para>
          </Essay>

          <Image
            className={`${styles.image} ${styles.resourceImg}`}
            src={resourceImage}
            alt="Internet resources illustration"
            placeholder="blur"
            blurDataURL="@/../../public/images/resources.png"
            // sizes="(min-width: 1320px) calc(-3.27vw + 593px), (min-width: 900px) calc(37.25vw + 66px), (min-width: 640px) 495px, (min-width: 500px) calc(37.5vw + 263px), 83.89vw"
          />
        </div>
      </div>
    </section>
  );
}
