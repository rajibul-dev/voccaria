"use client";

import { expressBackendBaseRESTOrigin } from "@/_constants/backendOrigins";
import { useEffect, useRef } from "react";

interface PaypalButtonProps {
  amount: number;
  currencyCode: string;
  name: string;
  onPaymentDetails?: any;
}

interface PaypalPaymentDetails {
  id: string;
  intent: string;
  status: string;
  purchase_units: any[];
  payer: any;
  create_time: string;
  update_time: string;
  links: any[];
}

const PaypalButton: React.FC<PaypalButtonProps> = ({
  amount,
  currencyCode,
  name,
  onPaymentDetails,
}) => {
  const paypal = useRef<any>(null);

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
            return actions.order.capture().then(async function (
              details: PaypalPaymentDetails,
            ) {
              console.log("Details:", details);
              console.log("Data:", data);
              onPaymentDetails(details);

              try {
                const response = await fetch(
                  `${expressBackendBaseRESTOrigin}/paypal`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ details, data }),
                  },
                );

                const result = await response.json();
                console.log("Backend response:", result);
              } catch (error: any) {
                console.error(
                  "Error sending payment details to backend:",
                  error,
                );
              }
            });
          },
          onError(error: any) {
            onPaymentDetails({ status: "FAILED", error });
            console.error(error);
          },
        })
        .render(paypal.current);
    },
    [amount, currencyCode, name, onPaymentDetails],
  );

  return <div style={{ marginBottom: "-10px" }} ref={paypal}></div>;
};

export default PaypalButton;
