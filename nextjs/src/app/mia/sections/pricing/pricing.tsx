// styles
import styles from "./pricing.module.css";

// componrnts
import HeadingPair from "@/app/components/headingPair";
import PricingCards from "./components/pricing-cards";

export default function Pricing() {
  return (
    <section
      id="pricing"
      className={`block ${styles.section}`}
    >
      <div className={`container`}>
        <HeadingPair
          tertiary="Paid Lessons"
          heading="Paid lesson options"
          isCentered={true}
          className={styles.heading}
          moreMargin={true}
        />
        <PricingCards />
      </div>
    </section>
  );
}
