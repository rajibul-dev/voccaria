import { Alert } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { addSeconds, isAfter } from "date-fns";

// styles
import styles from "./pricing.module.css";

// componrnts
import HeadingPair from "@/app/components/headingPair";
import PricingCards from "./components/pricing-cards";

// create the pricing credentials object (temp)
const oldPricingDetails = [
  // Euro dollar instences
  {
    currency: "eur",
    currencySymbol: "€",
    amount: 40,
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
    amount: 120,
    heading: "4 × 30-minute voice lessons",
    description: (
      <>
        4 Lessons for the price of 3!
        <br />
        <s>€160</s> <strong>€120</strong> €30 on average per lesson
      </>
    ),
  },
  {
    currency: "eur",
    currencySymbol: "€",
    amount: 240,
    heading: "4 × 60-minute voice lessons",
    description: (
      <>
        4 Lessons for the price of 3!
        <br />
        <s>€320</s> <strong>€240</strong> €60 on average per lesson
      </>
    ),
    recommended: true,
  },
];

const newPricingDetails = [
  // Euro dollar instences
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
    description: (
      <>
        <s>€180</s> <strong>€120</strong> (€35 per lesson)
      </>
    ),
  },
  {
    currency: "eur",
    currencySymbol: "€",
    amount: 280,
    heading: "4 × 60-minute voice lessons",
    description: (
      <>
        <s>€320</s> <strong>€280</strong> (€70 per lesson)
      </>
    ),
    recommended: true,
  },
];

// temp
// const targetDateOutside: any = addSeconds(new Date(), 5); // test
const targetDateOutside: any = new Date("2024-10-01T00:00:00+03:00"); // October 1st 12 AM EEST

export default function Pricing() {
  // temp
  const [countdown, setCountdown] = useState("");
  const countdownEnd = isAfter(new Date(), targetDateOutside);
  const [pricingDetails, setPricingDetails] = useState(oldPricingDetails);

  // temp
  useEffect(() => {
    // const targetDate: any = targetDateOutside; // test
    const targetDate: any = new Date("2024-10-01T00:00:00+03:00"); // October 1st 12 AM EEST

    const updateCountdown = () => {
      const now: any = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        setCountdown("The prices have changed!");
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      let countdownString = "";
      if (days > 0) countdownString += `${days}d `;
      if (days > 0 || hours > 0) countdownString += `${hours}h `;
      if (days > 0 || hours > 0 || minutes > 0)
        countdownString += `${minutes}m `;
      countdownString += `${seconds}s`;

      setCountdown(countdownString);
    };

    const interval = setInterval(updateCountdown, 1000);

    if (countdownEnd) {
      setPricingDetails(newPricingDetails);
    }

    return () => clearInterval(interval);
  }, [countdownEnd]);

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

        {/* Temp warning/info */}
        {!countdownEnd && (
          <Alert
            status="warning"
            alignItems="center"
            justifyContent="center"
            maxWidth={{
              pricingOneCol: "96rem",
              base: "47rem",
            }}
            px="2rem"
            py="1.3rem"
            mx="auto"
            mt="-1rem"
            mb="6rem"
            fontWeight={500}
          >
            <p style={{ textAlign: "center" }}>
              There will be a change in pricing from the beginning of October.
              <br />
              <strong>Countdown: {countdown}</strong>
            </p>
          </Alert>
        )}

        <PricingCards
          countdownEnd={countdownEnd}
          pricingDetails={pricingDetails}
        />
      </div>
    </section>
  );
}
