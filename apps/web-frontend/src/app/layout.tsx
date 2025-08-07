import dotenv from "dotenv";
dotenv.config();

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Viewport } from "next";

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

import Navbar from "./_components/Navbar";
import { Providers } from "./providers";
import { headers } from "next/headers"; // Import headers
import SearchContextProviderWrapper from "./_components/SearchContextProviderWrapper";

import { QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchCurrentUser } from "@/app/_hooks/useAuth"; // Import the fetchCurrentUser function

config.autoAddCss = false; /* eslint-disable import/first */

export const viewport: Viewport = {
  themeColor: "#c4265d",
};

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://voccaria.com"),
  title: {
    template: "%s - Voccaria",
    default: "Voccaria - Free Voice Lessons, Resources, and Community",
  },
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
  const headerList = headers(); // Get headers from the incoming request
  const cookieHeader = (await headerList).get("cookie") || undefined; // Extract the Cookie header

  const queryClient = new QueryClient();

  // Pass the cookieHeader to fetchCurrentUser when prefetching on the server
  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: () => fetchCurrentUser(cookieHeader),
  });

  const dehydratedState = dehydrate(queryClient);

  const pathname = (await headerList).get("x-current-path") || "";
  const isRoot = pathname === "/";

  return (
    <html
      className={isRoot ? "old-scaling" : ""}
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                const theme = localStorage.getItem("theme") || "light";
                if (theme === "dark") {
                  document.documentElement.classList.add("dark");
                } else {
                  document.documentElement.classList.remove("dark");
                }
              })();

              (function () {
                function updateHtmlClass() {
                  const pathname = window.location.pathname;
                  const isRoot = pathname === "/";
                  const html = document.documentElement;

                  if (isRoot) {
                    html.classList.add("old-scaling");
                  } else {
                    html.classList.remove("old-scaling");
                  }
                }

                updateHtmlClass();
              })();
            `,
          }}
        />
      </head>
      <body className={`${montserrat.className} antialiased dark:bg-gray-900`}>
        <SearchContextProviderWrapper>
          <Providers dehydratedState={dehydratedState}>
            <Navbar />
            <div>{children}</div>
          </Providers>
        </SearchContextProviderWrapper>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
