// styles
import ScheduleButtons from "./components/schedule-buttons";
import styles from "./scheduling.module.css";

// components
import HeadingPair from "@/app/components/headingPair";

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
      "Clicking this will open my Discord profile Mia#0006. We can decide a time for our lessons from there.",
    link: "https://discord.com/users/140513822069882881",
    buttonLabel: "To my Discord",
  },
];

export default function Scheduling() {
  return (
    <section
      className={`block ${styles.section}`}
      id="scheduling"
    >
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
          />
        </div>
      </div>
    </section>
  );
}
