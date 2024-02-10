// Import dotenv and configure it
import dotenv from "dotenv";
dotenv.config();

config.autoAddCss = false;

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

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
  keywords: [
    "Vocal Coach",
    "Learn to Sing",
    "Vocal Teacher",
    "Voice Training",
    "Singing Lessons",
    "Singing Practice",
    "Professional Vocal Training",
    "Mia vocal coach",
    "new york vocal coaching",
    "Learn singing",
    "One Voice",
    "Vocarria",
    "Free singing lessons",
    "Free singing learn",
    "Learn singing for free",
    "online vocal lessons",
    "voice lessons online",
    "vocal lessons",
    "vocal exercises",
    "vocal training exercises",
    "singing techniques",
    "singing tips",
    "vocal range",
    "vocal health",
    "vocal warm up",
    "singing posture",
    "vocal cords",
    "voice control",
    "breath support",
    "high notes",
    "low notes",
    "falsetto",
    "head voice",
    "chest voice",
    "mixed voice",
    "vibrato",
    "vocal fry",
    "belting",
    "diaphragm breathing",
    "phrasing",
    "articulation",
    "diction",
    "performance anxiety",
    "stage presence",
    "vocal anatomy",
    "singing terminology",
    "pitch",
    "tempo",
    "rhythm",
    "harmony",
    "ear training",
    "music theory",
    "vocal styles",
    "pop singing",
    "rock singing",
    "country singing",
    "jazz singing",
    "R&B singing",
    "soul singing",
    "gospel singing",
    "Mia Voice Teacher",
    "Mia Vocal Coach",
    "free singing lessons",
    "learn to sing for free",
    "singing lessons online for free",
    "One Voice",
    "Voccaria",
  ],
  authors: [{ name: "Mia", url: "https://voccaria.com" }],
  themeColor: "#c4265d",
  applicationName: "Voccaria",
  openGraph: {
    title: "Voccaria",
    description: `I’ve been teaching since 2019. I am certified by the NYVC Teacher Training program. I focus on alleviating tension, making singing effortless and natural, unlocking the full voice's potential. I call my approach "One Voice". I teach all contemporary genres. I can confidently teach people with hypermobility, GERD, ADHD/ADD and/or ASD.`,
    images: ["http://voccaria.com/images/Mia.jpeg"],
    url: "https://voccaria.com",
    type: "website",
  },
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
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
