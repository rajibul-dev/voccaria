"use client";

import React, { useCallback, useState } from "react";
import dynamic from "next/dynamic";

// styles
import Modal from "@/app/components/modal";
import styles from "./pricing-card-item.module.css";

// components
import Button from "@/app/components/button";
const ItemDetails = dynamic(() => import("./checkout/item-details"));

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
  const [modalHeading, setModalHeading] = useState<any>("Pay with PayPal");

  const handleChangeModalHeading = useCallback((heading: any) => {
    setModalHeading(heading);
  }, []);

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
        <Modal>
          <Modal.Open opens="payment-checkout">
            <Button
              isBlock={true}
              type="primary"
              size="big"
              className={styles.btn}
            >
              Buy now
            </Button>
          </Modal.Open>
          <Modal.Window name="payment-checkout" heading={modalHeading}>
            <ItemDetails
              currency={currency}
              amount={amount}
              name={name}
              price={price}
              onChangeModalHeading={handleChangeModalHeading}
              moreDescription={moreDescription}
            />
          </Modal.Window>
        </Modal>
      </div>
    </li>
  );
};

export default PricingCardItem;
