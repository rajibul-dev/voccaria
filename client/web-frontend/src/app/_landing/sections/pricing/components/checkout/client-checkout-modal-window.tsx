"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import Modal from "@/app/_old-components/modal";
import Button from "@/app/_old-components/button";

import styles from "./client-checkout-modal-window.module.css";
import { analytics, ProductId } from "@/_libs/analytics";

const ItemDetails = dynamic(() => import("./item-details"));

// Define the interface for props
interface ClientCheckoutPopupProps {
  productId: ProductId;
  amount: number;
  name: string;
  price: string;
  moreDescription?: string;
  currency?: string;
}

export default function ClientCheckoutModalWindow({
  productId,
  currency = "",
  amount,
  name,
  price,
  moreDescription,
}: ClientCheckoutPopupProps) {
  const [modalHeading, setModalHeading] = useState<any>("Pay with PayPal");

  const handleChangeModalHeading = useCallback((heading: any) => {
    setModalHeading(heading);
  }, []);

  return (
    <Modal>
      <Modal.Open opens="payment-checkout">
        <Button
          onClick={() =>
            analytics.checkoutStarted(productId, amount, currency.toUpperCase())
          }
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
          productId={productId}
          currency={currency}
          amount={amount}
          name={name}
          price={price}
          onChangeModalHeading={handleChangeModalHeading}
          moreDescription={moreDescription}
        />
      </Modal.Window>
    </Modal>
  );
}
