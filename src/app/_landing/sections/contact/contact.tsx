// styles
import styles from "./contact.module.css";
import foreignStyles from "../scheduling/scheduling.module.css";

// images
import ContactMeImg from "/public/images/contact-me-illustration.png";
import Image from "next/image";

// components
import HeadingPair from "@/app/_old-components/headingPair";
import ContactForm from "./components/contact-form";

export default function Contact() {
  return (
    <section id="contact" className={`section-block ${styles.section}`}>
      <div
        className={`old-container ${styles.container} ${foreignStyles.containerTwoCol}`}
      >
        <div className={styles.imgBox}>
          <Image
            className={styles.image}
            src={ContactMeImg}
            alt="Contact form, contact me illustration"
            placeholder="blur"
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
