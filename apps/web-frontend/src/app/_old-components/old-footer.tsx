"use client";

import clsx from "clsx";
import Link from "next/link";

import { footerLinks } from "../_components/Footer";
import OldTwoLogosAndSlash from "../_components/old-two-logo-and-slash";

export default function OldFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-700 pt-[5.6rem] pb-[5.6rem] max-lg:py-[8rem]">
      <div
        className={clsx(
          "mx-auto grid grid-cols-3 items-end justify-center gap-[4.8rem] px-[1.2rem] max-[1100px]:grid-cols-1 max-[1100px]:!gap-[3.2rem] max-[1100px]:px-[2rem] max-xl:gap-[1.6rem] max-lg:!gap-[5.4rem]",
        )}
      >
        <div
          className={clsx(
            "mb-[.6rem] flex flex-col gap-[2rem] justify-self-end border-b border-b-gray-300 pb-[.8rem] max-[1100px]:order-2 max-[1100px]:max-w-[72ch] max-[1100px]:justify-self-center",
          )}
        >
          <OldTwoLogosAndSlash />
          <p
            className={clsx(
              "text-end text-[1.6rem] leading-[1.5] text-gray-300 max-[1100px]:text-center max-md:text-[2rem] max-md:leading-[1.7]",
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
                className="mb-[1.1rem] text-[1.6rem] leading-[1.5] font-semibold text-white max-md:text-[2rem] max-md:leading-[1.7]"
              >
                {section.section}
              </h2>
              <ul className="space-y-[.75rem]">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[1.4rem] leading-[1.5] text-gray-300 transition-colors hover:text-white max-md:text-[1.8rem] max-md:leading-[1.7]"
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
            "mb-[.6rem] max-w-[44ch] justify-self-start border-b border-b-gray-300 pb-[.8rem] max-[1100px]:order-3 max-[1100px]:justify-self-center max-lg:max-w-[57ch] max-sm:w-full",
          )}
        >
          <p
            className={clsx(
              "text-end text-[1.8rem] text-gray-300 max-[1100px]:text-start max-md:text-[2.2rem] max-md:leading-[1.6]",
            )}
          >
            This website is designed and built by{" "}
            <a
              className="text-my-pink-300 hover:text-my-pink-400 font-medium transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.notion.so/Portfolio-1cc7bdc1208c80bfa968c49fbf67118f?pvs=4"
            >
              Rajibul Islam
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
