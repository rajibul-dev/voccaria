import React from "react";

// styles
import Modal from "@/app/_old-components/modal";
import styles from "./pricing-card-item.module.css";
import dynamic from "next/dynamic";

// components
import OldButton from "@/app/_old-components/button";
import Button from "@/app/_components/Button";

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
  importantInfo?: {
    label?: string;
    description: string | React.ReactNode;
  };
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
  importantInfo,
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
        {description && (
          <p className={styles.description}>
            {description}{" "}
            {importantInfo && (
              <Modal>
                <Modal.Open opens="info">
                  <Button
                    className="dark:text-my-pink-600 hover:dark:bg-my-pink-100 inline px-[2px] py-[0px] ![font-size:inherit]"
                    variant="subtle"
                  >
                    {importantInfo.label}
                  </Button>
                </Modal.Open>
                <Modal.Window heading={importantInfo.label} name="info">
                  <div className="text-[1.8rem] leading-[1.6] text-gray-900 max-md:text-[2.1rem]">
                    {importantInfo.description}
                  </div>
                </Modal.Window>
              </Modal>
            )}
          </p>
        )}

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
