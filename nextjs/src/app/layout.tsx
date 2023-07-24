import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
      <body suppressHydrationWarning={true} className={montserrat.className}>
        {children}
      </body>
    </html>
  );
}
