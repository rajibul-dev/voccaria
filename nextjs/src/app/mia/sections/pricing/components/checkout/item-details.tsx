"use client";

import { useCallback, useEffect, useState } from "react";

// styles
import styles from "./item-details.module.css";
import PaypalButton from "./paypalButton";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@/app/components/button";

const checkIcon = (
  <FontAwesomeIcon
    icon={faCircleCheck}
    className={styles.checkIcon}
  />
);
const xmarkIcon = (
  <FontAwesomeIcon
    icon={faCircleXmark}
    className={styles.xmarkIcon}
  />
);

interface ItemDetailsProps {
  name: string;
  currency: string;
  amount: number;
  price: string;
  onChangeModalHeading: any;
  onCloseModal?: any;
  setShowCloseIcon?: any;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({
  name,
  currency,
  amount,
  price,
  onChangeModalHeading,
  onCloseModal,
  setShowCloseIcon,
}) => {
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const isPaymentSuccessful = paymentDetails?.status === "COMPLETED";
  const payerName = `${paymentDetails?.payer?.name.given_name} ${
    paymentDetails?.payer?.name.surname || ""
  }`.slice();

  const handleAddDetails = useCallback((details: any) => {
    setPaymentDetails(details);
  }, []);
  const handleCloseCrossIcon = useCallback(() => {
    setShowCloseIcon(false);
  }, [setShowCloseIcon]);

  // Modal heading change
  useEffect(
    function () {
      switch (paymentDetails?.status) {
        case "COMPLETED":
          handleCloseCrossIcon();
          onChangeModalHeading(
            <>
              {checkIcon}
              <span>Payment Successful!</span>
            </>,
          );
          break;

        case "FAILED":
          onChangeModalHeading(
            <>
              {xmarkIcon}
              <span>Transaction Failed</span>
            </>,
          );
          break;

        default:
          onChangeModalHeading("Pay with PayPal");
          break;
      }
    },
    [paymentDetails, onChangeModalHeading, handleCloseCrossIcon],
  );

  return (
    <div className="item-details">
      <h3 className={styles.price}>{price}</h3>

      {!isPaymentSuccessful && (
        <p className={`goto-paragraph ${styles.description}`}>{name}</p>
      )}
      {isPaymentSuccessful && (
        <p className={`goto-paragraph ${styles.message}`}>
          Your payment for <b>{name}</b> was successful! Thank you!
        </p>
      )}
      {isPaymentSuccessful && (
        <div className={`goto-paragraph ${styles.paymentDetails}`}>
          <p>
            <b>Payer Name: </b>
            {payerName}
          </p>
          <p>
            <b>Date of payment: </b>
            {new Date(paymentDetails?.update_time).toLocaleString()}
          </p>
        </div>
      )}

      {!isPaymentSuccessful ? (
        <PaypalButton
          name={name}
          currencyCode={currency.toUpperCase()}
          amount={amount}
          onPaymentDetails={handleAddDetails}
        />
      ) : (
        <Button
          type="secondary"
          isBlock
          onClick={onCloseModal}
        >
          Close
        </Button>
      )}
    </div>
  );
};

export default ItemDetails;
