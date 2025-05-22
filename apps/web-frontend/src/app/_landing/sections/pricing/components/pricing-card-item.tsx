import React from "react";

// styles
import Modal from "@/app/_old-components/modal";
import styles from "./pricing-card-item.module.css";
import dynamic from "next/dynamic";

// components
import OldButton from "@/app/_old-components/button";

const ClientCheckoutModalWindow = dynamic(
  () => import("./checkout/client-checkout-modal-window"),
);

interface PricingCardItemProps {
  price: string;
  name: string;
  description: string | React.ReactNode | null;
  isRecommended?: boolean;
  currency?: string;
  amount?: number;
  className?: string;
  moreDescription?: string;
  recommendedRow?: boolean;
}

const PricingCardItem: React.FC<PricingCardItemProps> = ({
  price,
  name,
  description,
  isRecommended,
  currency = "",
  amount = 0,
  className = "",
  moreDescription,
  recommendedRow,
}) => {
  const nameSlittedArray = name.split(" ");
  const sliceFirstPart = nameSlittedArray.slice(0, -2).join(" ");
  const sliceSecondPart = nameSlittedArray.slice(-2).join(" ");

  const cookedName = (
    <>
      {sliceFirstPart}
      <br />
      {sliceSecondPart}
    </>
  );

  return (
    <li
      // partial temp
      className={`${styles.card} ${
        isRecommended ? styles.recommendedTagContainer : ""
      } ${recommendedRow ? styles.recommendedRow : ""} ${styles[className]} ${
        !description ? styles.cardWhenNoDescription : ""
      } ${
        !description && isRecommended ? styles.recommendedYetNoDescription : ""
      }`}
    >
      {isRecommended && (
        <span className={styles.recommendedTag}>Recommended</span>
      )}
      <div className={styles.flex}>
        <span className={styles.price}>{price}</span>
        <h3
          className={`${styles.name} ${
            !description ? styles.nameWhenNoDescription : ""
          }`}
        >
          {cookedName}
        </h3>
        {description && <p className={styles.description}>{description}</p>}

        <ClientCheckoutModalWindow
          amount={amount}
          currency={currency}
          moreDescription={moreDescription}
          name={name}
          price={price}
        />
      </div>
    </li>
  );
};

export default PricingCardItem;
