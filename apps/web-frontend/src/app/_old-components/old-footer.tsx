"use client";

import clsx from "clsx";
import Link from "next/link";

import { footerLinks } from "../_components/Footer";
import OldTwoLogosAndSlash from "../_components/old-two-logo-and-slash";

export const wantDarkFooter = false; // for old landing page

export default function OldFooter() {
  const year = new Date().getFullYear();
  return (
    <footer
      className={clsx(
        "bg-gray-300 pt-[5.6rem] pb-[5.6rem] max-lg:py-[8rem]",
        wantDarkFooter && "dark:bg-gray-700",
      )}
    >
      <div
        className={clsx(
          "mx-auto grid grid-cols-3 items-end justify-center gap-[4.8rem] px-[1.2rem] max-[1100px]:grid-cols-1 max-[1100px]:!gap-[3.2rem] max-[1100px]:px-[2rem] max-xl:gap-[1.6rem] max-lg:!gap-[5.4rem]",
        )}
      >
        <div
          className={clsx(
            "mb-[.6rem] flex flex-col gap-[2rem] justify-self-end border-b border-b-gray-800 pb-[.8rem] max-[1100px]:order-2 max-[1100px]:max-w-[72ch] max-[1100px]:justify-self-center",
            wantDarkFooter && "dark:border-b-gray-300",
          )}
        >
          <OldTwoLogosAndSlash />
          <p
            className={clsx(
              "text-end text-[1.6rem] leading-[1.5] text-gray-800 max-[1100px]:text-center max-md:text-[2rem] max-md:leading-[1.7]",
              wantDarkFooter && "dark:text-gray-300",
            )}
          >
            © {year} Voccaria. All rights reserved.
          </p>
        </div>

        {/* Footer navigation sections */}
        <div
          className={clsx(
            "flex justify-center gap-[4.8rem] max-xl:gap-[3.2rem]",
          )}
        >
          {footerLinks.map((section) => (
            <nav
              key={section.section}
              aria-labelledby={`${section.section}-heading`}
            >
              <h2
                id={`${section.section}-heading`}
                className={clsx(
                  "mb-[1.1rem] text-[1.6rem] leading-[1.5] font-semibold text-gray-800 max-md:text-[2rem] max-md:leading-[1.7]",
                  wantDarkFooter && "dark:text-white",
                )}
              >
                {section.section}
              </h2>
              <ul className="space-y-[.75rem]">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={clsx(
                        "text-[1.4rem] leading-[1.5] text-gray-700 transition-colors hover:text-gray-900 max-md:text-[1.8rem] max-md:leading-[1.7]",
                        wantDarkFooter &&
                          "dark:text-gray-300 dark:hover:text-white",
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Showing my portfolio */}
        <div
          className={clsx(
            "mb-[.6rem] max-w-[44ch] justify-self-start border-b border-b-gray-800 pb-[.8rem] max-[1100px]:order-3 max-[1100px]:justify-self-center max-lg:max-w-[57ch] max-sm:w-full",
            wantDarkFooter && "dark:border-b-gray-300",
          )}
        >
          <p
            className={clsx(
              "text-end text-[1.8rem] text-gray-800 max-[1100px]:text-start max-md:text-[2.2rem] max-md:leading-[1.6]",
              wantDarkFooter && "dark:text-gray-300",
            )}
          >
            This website is designed and built by{" "}
            <a
              className={clsx(
                "text-my-pink-600 hover:text-my-pink-500 font-medium transition-colors",
                wantDarkFooter &&
                  "dark:text-my-pink-300 dark:hover:text-my-pink-400",
              )}
              target="_blank"
              rel="noopener noreferrer"
              href="https://cloud-gold-6b4.notion.site/Portfolio-Rajibul-Islam-2327bdc1208c80009642f71a54f616ee?source=copy_link"
            >
              Rajibul Islam
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
