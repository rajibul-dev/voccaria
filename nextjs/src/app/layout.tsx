import "./globals.css"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css"
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false /* eslint-disable import/first */

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "Voccaria - Voice Lessons, Singing Resources & Community",
  description:
    "Voccaria is an organization created for the purpose of teaching people how to sing using sustainable, strain free techniques.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={montserrat.className}>
        {children}
      </body>
    </html>
  )
}
