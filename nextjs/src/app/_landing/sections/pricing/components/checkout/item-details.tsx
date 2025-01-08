"use client";

import { useCallback, useEffect, useState } from "react";

// styles
import styles from "./item-details.module.css";

// component
const PaypalButton = dynamic(() => import("./paypalButton"));

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@/app/_components/button";
import dynamic from "next/dynamic";

const checkIcon = (
  <FontAwesomeIcon icon={faCircleCheck} className={styles.checkIcon} />
);
const xmarkIcon = (
  <FontAwesomeIcon icon={faCircleXmark} className={styles.xmarkIcon} />
);

interface ItemDetailsProps {
  name: string;
  currency: string;
  amount: number;
  price: string;
  onChangeModalHeading: any;
  onCloseModal?: any;
  setShowCloseIcon?: any;
  moreDescription?: string;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({
  name,
  currency,
  amount,
  price,
  onChangeModalHeading,
  onCloseModal,
  setShowCloseIcon,
  moreDescription = null,
}) => {
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const isPaymentSuccessful = paymentDetails?.status === "COMPLETED";
  const payerName = `${paymentDetails?.payer?.name.given_name} ${
    paymentDetails?.payer?.name.surname || ""
  }`.slice();

  const handleAddDetails = useCallback((details: any) => {
    setPaymentDetails(details);
  }, []);
  const handleShowCrossIcon = useCallback(
    (bool: boolean) => {
      setShowCloseIcon(bool);
    },
    [setShowCloseIcon]
  );

  // Modal heading change
  useEffect(
    function () {
      switch (paymentDetails?.status) {
        case "COMPLETED":
          handleShowCrossIcon(false);
          onChangeModalHeading(
            <>
              {checkIcon}
              <span>Payment Successful!</span>
            </>
          );
          break;

        case "FAILED":
          handleShowCrossIcon(true);
          onChangeModalHeading(
            <>
              {xmarkIcon}
              <span>Transaction Failed</span>
            </>
          );
          break;

        default:
          onChangeModalHeading("Pay with PayPal");
          break;
      }
    },
    [paymentDetails, onChangeModalHeading, handleShowCrossIcon]
  );

  return (
    <div className="item-details">
      <h3 className={styles.price}>{price}</h3>

      {!isPaymentSuccessful && (
        <>
          <p
            className={`goto-paragraph ${styles.description} ${
              moreDescription ? styles.hasMoreDescription : ""
            }`}
          >
            {name}
          </p>
          {moreDescription && (
            <p
              // style={{ marginTop: "-2rem" }}
              className={`goto-paragraph ${styles.description}`}
            >
              {moreDescription}
            </p>
          )}
        </>
      )}
      {isPaymentSuccessful && (
        <p className={`goto-paragraph ${styles.message}`}>
          Your payment for <b>{name}</b> was successful! Thank you!
          {moreDescription && (
            <>
              <br /> You can submit the recording and the description of your
              desired sound and style on{" "}
              <a
                href="https://discord.com/users/140513822069882881"
                className="inline-a"
                target="_blank"
                rel="noopener noreferrer"
              >
                my Discord mia0006
              </a>{" "}
              or on my email{" "}
              <a
                href="mailto:voccaria@gmail.com"
                className="inline-a"
                target="_blank"
                rel="noopener noreferrer"
              >
                voccaria@gmail.com
              </a>
            </>
          )}
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
        <Button type="secondary" isBlock onClick={onCloseModal}>
          Close
        </Button>
      )}
    </div>
  );
};

export default ItemDetails;
