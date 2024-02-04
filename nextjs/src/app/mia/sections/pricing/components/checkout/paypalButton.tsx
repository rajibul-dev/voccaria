"use client";

import { useEffect, useRef } from "react";

interface PaypalButtonProps {
  amount: number;
  currencyCode: string;
  name: string;
}

const PaypalButton: React.FC<PaypalButtonProps> = ({
  amount,
  currencyCode,
  name,
}) => {
  const paypal = useRef<any>();

  useEffect(
    function () {
      // @ts-ignore
      window.paypal
        .Buttons({
          style: {
            height: 55,
            size: "large",
            shape: "pill",
            color: "white",
            label: "buynow",
            layout: "vertical",
            tagline: false,
          },
          createOrder: function (data: any, actions: any) {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  amount: {
                    currency_code: currencyCode,
                    value: amount,
                  },
                  secret: process.env.PAYPAL_CLIENT_SECRET,
                  description: name,
                },
              ],
            });
          },
          onApprove: function (data: any, actions: any) {
            return actions.order.capture().then(function (details: any) {
              alert(
                "Transaction completed by " + details.payer.name.given_name,
              );
            });
          },
        })
        .render(paypal.current);
    },
    [amount, currencyCode, name],
  );

  return (
    <div
      style={{ marginBottom: "-10px" }}
      ref={paypal}
    ></div>
  );
};

export default PaypalButton;
