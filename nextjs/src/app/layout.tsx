// Import dotenv and configure it
import dotenv from "dotenv";
dotenv.config();

config.autoAddCss = false;

import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false; /* eslint-disable import/first */

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Voccaria - Voice Lessons, Singing Resources & Community",
  description:
    "Voccaria is an organization created for the purpose of teaching people how to sing using sustainable, strain free techniques.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          id="paypal-script"
          src={`https://www.paypal.com/sdk/js?client-id=${process.env.PAYPAL_CLIENT_ID}&components=buttons&currency=EUR`}
          async
          // @ts-ignore
          as="script"
        ></script>
      </head>
      <body
        suppressHydrationWarning={true}
        className={montserrat.className}
      >
        {children}
      </body>
    </html>
  );
}
