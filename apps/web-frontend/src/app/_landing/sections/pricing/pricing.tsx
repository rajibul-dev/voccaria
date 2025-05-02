"use client";

// styles
import styles from "./pricing.module.css";

// componrnts
import HeadingPair from "@/app/_old-components/headingPair";
import PricingCards from "./components/pricing-cards";
import { useCountdown, makeCountdownString } from "@/app/_hooks/useCountdown";
import { useEffect, useState } from "react";
import { addSeconds } from "date-fns";

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

const newPricingDetails = [
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
    amount: 50,
    heading: "Singular 30-minute voice lesson",
    description: "A short session to get you going in the right direction!",
  },
  {
    currency: "eur",
    currencySymbol: "€",
    amount: 90,
    heading: "Singular 60-minute voice lesson",
    description:
      "Enough time for us to give plenty of attention to technique, supervised practice and/or song work!",
  },
  {
    currency: "eur",
    currencySymbol: "€",
    amount: 160,
    heading: "4 × 30-minute voice lessons",
    description: "€40 per lesson!",
    recommendedRow: true,
  },
  {
    currency: "eur",
    currencySymbol: "€",
    amount: 320,
    heading: "4 × 60-minute voice lessons",
    description: "€80 per lesson!",
    recommended: true,
    recommendedRow: true,
  },
];

// testing countdown
// const targetDateOutside: any = addSeconds(new Date(), 5);

// June 1st 12 AM EEST
const targetDateOutside: any = new Date("2025-06-01T00:00:00Z");

export default function Pricing() {
  const { timeLeft, isComplete } = useCountdown(targetDateOutside);

  const [countdownString, setCountdownString] = useState("");

  useEffect(() => {
    setCountdownString(makeCountdownString(timeLeft));
  }, [timeLeft, isComplete]);

  return (
    <section id="pricing" className={`section-block ${styles.section}`}>
      <div className={`old-container`}>
        <HeadingPair
          tertiary="Paid Lessons"
          heading="Paid lesson options"
          isCentered={true}
          className={styles.heading}
          moreMargin={true}
        />

        {/* Countdown UI */}
        {!isComplete && (
          <div className="mx-auto mt-[-2rem] mb-[6rem] max-w-220 rounded-lg bg-orange-100 px-4 py-3 shadow-md">
            <p className="text-center text-[1.8rem] leading-11">
              There will be pricing changes from June 1
              <br />
              <strong>Countdown: {countdownString}</strong>
            </p>
          </div>
        )}

        <PricingCards
          pricingDetails={isComplete ? newPricingDetails : pricingDetails}
        />
      </div>
    </section>
  );
}
