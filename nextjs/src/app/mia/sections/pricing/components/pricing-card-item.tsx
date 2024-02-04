"use client";

// styles
import Modal from "@/app/components/modal";
import styles from "./pricing-card-item.module.css";

// components
import Button from "@/app/components/button";
import ItemDetails from "./checkout/item-details";

interface PricingCardItemProps {
  price: string;
  name: string;
  description: any;
  isRecommended?: boolean;
  currency?: string;
  amount?: number;
}

const PricingCardItem: React.FC<PricingCardItemProps> = ({
  price,
  name,
  description,
  isRecommended,
  currency = "",
  amount = 0,
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
      className={`${styles.card} ${
        isRecommended ? styles.recommendedTagContainer : ""
      }`}
    >
      {isRecommended && (
        <span className={styles.recommendedTag}>Recommended</span>
      )}
      <div className={styles.flex}>
        <span className={styles.price}>{price}</span>
        <h3 className={styles.name}>{cookedName}</h3>
        <p className={styles.description}>{description}</p>
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
          <Modal.Window
            name="payment-checkout"
            heading="Pay with PayPal"
          >
            <ItemDetails
              currency={currency}
              amount={amount}
              name={name}
              price={price}
            />
          </Modal.Window>
        </Modal>
      </div>
    </li>
  );
};

export default PricingCardItem;
