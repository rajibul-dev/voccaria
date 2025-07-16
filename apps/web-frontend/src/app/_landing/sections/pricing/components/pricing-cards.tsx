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
  description: string | React.ReactNode | null;
  recommended?: boolean;
  className?: string;
  moreDescription?: string;
  recommendedRow?: boolean;
  importantInfo?: {
    label?: string;
    description: string | React.ReactNode;
  };
}

interface PricingCardsProps {
  pricingDetails: PricingDetails[];
}

const PricingCards: React.FC<PricingCardsProps> = ({ pricingDetails }) => {
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
          recommendedRow={item?.recommendedRow}
          importantInfo={item?.importantInfo}
        />
      ))}
    </ul>
  );
};

export default PricingCards;
