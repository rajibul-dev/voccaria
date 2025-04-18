// Import dotenv and configure it
import dotenv from "dotenv";
dotenv.config();

config.autoAddCss = false;

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Viewport } from "next";

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";

import { Providers } from "./providers";
import { headers } from "next/headers";

config.autoAddCss = false; /* eslint-disable import/first */

export const viewport: Viewport = {
  themeColor: "#c4265d",
};

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://voccaria.com"),
  title: "Voccaria - Free Voice Lessons, Resources, and Community",
  description:
    "Voccaria provides free, high-quality singing lessons in a supportive, science-based environment. Unlock your voice with expert guidance and resources.",
  icons: {
    icon: ["/logo-icon-pack/favicon.ico"],
    apple: ["/logo-icon-pack/apple-touch-icon.png"],
    shortcut: ["/logo-icon-pack/apple-touch-icon.png"],
  },
  manifest: "/logo-icon-pack/site.webmanifest",
  keywords: [
    "Vocal Coach",
    "Learn to Sing",
    "Vocal Teacher",
    "Voice Training",
    "Singing Lessons",
    "Mia voice teacher",
    "new york vocal coaching",
    "Learn singing",
    "One Voice",
    "Free singing lessons",
    "Learn singing for free",
    "online voice lessons",
    "voice lesson",
    "voice lessons",
    "head voice",
    "pop singing",
    "rock singing",
    "country singing",
    "jazz singing",
    "R&B singing",
    "soul singing",
    "gospel singing",
    "Mia Voice Teacher",
    "Mia Vocal Coach",
    "free lessons",
    "learn to sing for free",
    "singing lessons online for free",
    "Voccaria",
  ],
  authors: [{ name: "Mia", url: "https://voccaria.com" }],
  applicationName: "Voccaria",
  openGraph: {
    title: "Voccaria",
    description: `I’ve been teaching since 2019. I am certified by the NYVC Teacher Training program. I focus on alleviating tension, making singing effortless and natural, unlocking the full voice's potential. I call my approach "One Voice". I teach all contemporary genres. I can confidently teach people with hypermobility, GERD, ADHD/ADD and/or ASD.`,
    images: ["http://voccaria.com/images/Mia.jpeg"],
    url: "https://voccaria.com",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers();
  const pathname = headerList.get("x-current-path");
  const isRoot = pathname === "/";

  return (
    <html
      className={isRoot ? "old-page" : ""}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <script
          id="paypal-script"
          src={`https://www.paypal.com/sdk/js?client-id=${process.env.PAYPAL_CLIENT_ID}&components=buttons&currency=EUR`}
          async
          // @ts-ignore
          as="script"
        ></script>
      </head>
      <body className={montserrat.className}>
        <Providers>{children}</Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
