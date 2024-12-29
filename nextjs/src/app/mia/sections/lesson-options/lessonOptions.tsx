const lessonOptionsObj = {
  free: {
    heading: "Free Lessons",
    listItems: [
      "Receive one 30-minute lesson per week",
      "Our primary focus is on mastering techniques to ensure safe, independent practice. Supervised practice is limited to the lesson duration.",
      "Submit recordings publicly in the One Voice server for evaluation when available",
      "Scheduling is less flexible, and personalization options are limited due to time constraints",
    ],
    button: {
      text: "Get Free Lessons at One Voice",
      link: "https://discord.com/invite/4Z5JKYPhTe",
    },
  },
  paid: {
    heading: "Paid Lessons",
    listItems: [
      "Choose from 30-minute or 1-hour sessions, unlimited times per week (up to 2 hours per session)",
      "Focus on both technique and supervised practice during lessons",
      "Submit recordings privately for prompt evaluation",
      "Greater personalization and dedicated space to share resources and progress due to increased lesson time",
    ],
    button: {
      text: "Apply for Private Paid Lessons",
      link: "https://docs.google.com/forms/d/1dW-N6xyf7ATc6zCIL0rR1I63EN4A4U6JghhPA6xi2pM/viewform?edit_requested=true",
    },
    lightInfo: (
      <>
        Free consultation available before starting
        <br className={styles.responsiveLineBreak}></br> paid lessons
      </>
    ),
  },
};
const { free, paid } = lessonOptionsObj;

// styles
import styles from "./lessonOptions.module.css";

// components
import HeadingPair from "@/app/components/headingPair";
import FeatureBox from "./components/featureBox";

export default function LessonOptions() {
  return (
    <section id="lesson-options" className={`block`}>
      <div className={`container`}>
        <HeadingPair
          tertiary="Lesson options"
          heading="My current options for lessons"
          isCentered={true}
          moreMargin={true}
        />

        <div className={styles.boxPair}>
          <FeatureBox
            heading={free.heading}
            listItems={free.listItems}
            button={free.button}
          />
          <FeatureBox
            heading={paid.heading}
            listItems={paid.listItems}
            button={paid.button}
            brandColor={true}
            lightInfo={paid.lightInfo}
          />
        </div>
      </div>
    </section>
  );
}
