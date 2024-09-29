// styles
import styles from "./pricing-cards.module.css";

// components
import PricingCardItem from "./pricing-card-item";
import React from "react";

// typescript type definition
interface PricingDetails {
  currency: string;
  currencySymbol: string;
  amount: number;
  heading: string;
  description: string | React.ReactNode;
  recommended?: boolean;
  className?: string;
  moreDescription?: string;
}

interface PricingCardsProps {
  pricingDetails: PricingDetails[];
  countdownEnd?: boolean; // temp
}

const PricingCards: React.FC<PricingCardsProps> = ({
  pricingDetails,
  countdownEnd, // temp
}) => {
  return (
    <ul className={styles.grid}>
      {pricingDetails.map((item) => (
        <PricingCardItem
          name={item.heading}
          price={`${item.currencySymbol}${item.amount}`}
          key={item.heading}
          description={item.description}
          isRecommended={item?.recommended ?? false}
          currency={item.currency}
          amount={item.amount}
          className={item?.className}
          moreDescription={item?.moreDescription}
          // temp
          countdownEnd={countdownEnd}
        />
      ))}
    </ul>
  );
};

export default PricingCards;
