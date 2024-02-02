// styles
import styles from "./contact.module.css";
import foreignStyles from "../scheduling/scheduling.module.css";

// images
import ContactMeImg from "../../../../../public/images/contact-me.png";
import Image from "next/image";

// components
import HeadingPair from "@/app/components/headingPair";
import ContactForm from "./components/contact-form";

export default function Contact() {
  return (
    <section
      className={`block ${styles.section}`}
      id="contact"
    >
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
