// styles
import styles from "./pricing-cards.module.css";

// components
import PricingCardItem from "./pricing-card-item";

// create the pricing credentials object
const pricingDetails = [
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
    heading: "Singular 1 hour voice lesson",
    description:
      "Enough time for us to give plenty of attention to technique, supervised practice and/or song work!",
  },
  {
    currency: "eur",
    currencySymbol: "€",
    amount: 120,
    heading: "Package of 4 30-minute voice lessons",
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
    heading: "Package of 4 one hour voice lessons",
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

export default function PricingCards() {
  return (
    <ul className={styles.grid}>
      {pricingDetails.map((item) => (
        <PricingCardItem
          name={item.heading}
          price={`${item.currencySymbol}${item.amount}`}
          key={item.heading}
          description={item.description}
          isRecommended={item?.recommended ?? false}
        />
      ))}
    </ul>
  );
}
