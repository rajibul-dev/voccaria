// styles
import ScheduleButtons from "./components/schedule-buttons";
import styles from "./scheduling.module.css";

// components
import HeadingPair from "@/app/_components/headingPair";

// image
import scheduleImage from "../../../../../public/images/schedule.jpg";
import Image from "next/image";

// scheduling button text and links
const schedulingData = [
  {
    name: "Schedule from Calendly",
    description:
      "This is my general availability for the free & paid lessons. Please contact me on Discord before you schedule.",
    link: "https://calendly.com/miavocalcoach/gen-availability",
    buttonLabel: "To Calendly",
  },
  {
    name: "Schedule from Discord",
    description:
      "Clicking this will open my Discord profile mia0006. We can decide a time for our lessons from there.",
    link: "https://discord.com/users/140513822069882881",
    buttonLabel: "To my Discord",
  },
];

export default function Scheduling() {
  return (
    <section id="scheduling" className={`block ${styles.section}`}>
      <div className={`container ${styles.containerTwoCol}`}>
        <div className={`${styles.textPortion}`}>
          <HeadingPair
            tertiary="Lesson scheduling"
            heading="Book your lesson"
            moreMargin={true}
          />
          <ScheduleButtons schedulingData={schedulingData} />
        </div>
        <div className={styles.imageBox}>
          <Image
            className={styles.image}
            src={scheduleImage}
            alt="Booking a date illustration art vector graphic"
            placeholder="blur"
            blurDataURL="../../../../../public/images/schedule.jpg"
            // sizes="(min-width: 1220px) calc(-3.65vw + 545px), (min-width: 820px) calc(37.89vw + 45px), (min-width: 520px) 450px, (min-width: 480px) calc(250vw - 800px), calc(81.25vw + 26px)"
          />
        </div>
      </div>
    </section>
  );
}
