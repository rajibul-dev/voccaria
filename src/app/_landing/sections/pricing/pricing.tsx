// styles
import styles from "./pricing.module.css";

// componrnts
import HeadingPair from "@/app/_components/headingPair";
import PricingCards from "./components/pricing-cards";

// create the pricing credentials object (temp)

const pricingDetails = [
  // Euro dollar instences
  {
    currency: "eur",
    currencySymbol: "€",
    amount: 50,
    heading:
      "Written Recording Review + Custom Vocal Development Plan (Offline Written/Video Feedback, One-Time)",
    description:
      "A personalized, in-depth review of your vocal habits and techniques, along with detailed feedback on what can be improved and how. You'll also receive a custom roadmap designed to help you achieve your vocal goals with clear, actionable steps.",
    className: "recordingReviewCard",
    moreDescription:
      "Send your recordings and a detailed description of the sound and style you're aiming for to begin your customized vocal journey!",
  },
  {
    currency: "eur",
    currencySymbol: "€",
    amount: 45,
    heading: "Singular 30-minute voice lesson",
    description: "A short session to get you going in the right direction!",
  },
  {
    currency: "eur",
    currencySymbol: "€",
    amount: 80,
    heading: "Singular 60-minute voice lesson",
    description:
      "Enough time for us to give plenty of attention to technique, supervised practice and/or song work!",
  },
  {
    currency: "eur",
    currencySymbol: "€",
    amount: 140,
    heading: "4 × 30-minute voice lessons",
    description: null,
    recommendedRow: true,
  },
  {
    currency: "eur",
    currencySymbol: "€",
    amount: 280,
    heading: "4 × 60-minute voice lessons",
    description: null,
    recommended: true,
    recommendedRow: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className={`block ${styles.section}`}>
      <div className={`container`}>
        <HeadingPair
          tertiary="Paid Lessons"
          heading="Paid lesson options"
          isCentered={true}
          className={styles.heading}
          moreMargin={true}
        />

        <PricingCards pricingDetails={pricingDetails} />
      </div>
    </section>
  );
}
