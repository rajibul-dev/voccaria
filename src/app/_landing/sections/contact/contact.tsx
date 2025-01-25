// styles
import styles from "./contact.module.css";
import foreignStyles from "../scheduling/scheduling.module.css";

// images
import ContactMeImg from "../../../../../public/images/contact-me.png";
import Image from "next/image";

// components
import HeadingPair from "@/app/_components/headingPair";
import ContactForm from "./components/contact-form";

export default function Contact() {
  return (
    <section id="contact" className={`section-block ${styles.section}`}>
      <div
        className={`container ${styles.container} ${foreignStyles.containerTwoCol}`}
      >
        <div className={styles.imgBox}>
          <Image
            className={styles.image}
            src={ContactMeImg}
            alt="Contact form, contact me illustration"
            placeholder="blur"
            blurDataURL="../../../../../public/images/contact-me.png"
            // sizes="(min-width: 1280px) calc(-4.77vw + 555px), (min-width: 820px) calc(35.91vw + 43px), 90vw"
          />
        </div>
        <div className={styles.textPortion}>
          <HeadingPair
            tertiary="Contact me"
            heading="Have a question?"
            moreMargin={true}
          />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
