"use client";

import clsx from "clsx";
import Link from "next/link";
import TwoLogosAndSlash from "./TwoLogosAndSlash";
import { usePathname } from "next/navigation";

export const footerLinks = [
  {
    section: "Website",
    links: [
      { name: "About Mia", href: "/" },
      { name: "Blog", href: "/blog" },
      { name: "Free lesson info", href: "/#lesson-options" },
      {
        name: "Apply for paid lessons",
        href: "https://docs.google.com/forms/d/1dW-N6xyf7ATc6zCIL0rR1I63EN4A4U6JghhPA6xi2pM/viewform?edit_requested=true",
      },
      { name: "Buy paid lessons", href: "/#pricing" },
      {
        name: "Schedule a lesson",
        href: "https://calendly.com/miavocalcoach/gen-availability?month=2025-05",
      },
    ],
  },
  {
    section: "Socials",
    links: [
      { name: "Discord server", href: "https://discord.com/invite/4Z5JKYPhTe" },
      { name: "Twitch", href: "https://www.twitch.tv/miavoiceteacher" },
      {
        name: "YouTube",
        href: "https://www.youtube.com/channel/UCP81Xp_j1hK2w1DbVvuItmQ",
      },
      { name: "Patreon", href: "https://www.patreon.com/MiaVoiceTeacher" },
      {
        name: "Mia’s discord",
        href: "http://discordapp.com/users/140513822069882881",
      },
      {
        name: "Mia’s tipping page",
        href: "https://streamelements.com/miavoiceteacher/tip",
      },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();
  const isPostPage = pathname.startsWith(`/blog/`);

  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-300 pt-14 pb-14 dark:bg-gray-700">
      <div
        className={clsx(
          "mx-auto grid grid-cols-3 items-end justify-center gap-12 px-3 max-[1100px]:grid-cols-1 max-[1100px]:!gap-8 max-[1100px]:px-5 max-xl:gap-4",
          {
            "max-[1600px]:gap-6 max-[1500px]:grid-cols-1 max-[1500px]:!gap-8 max-[1500px]:px-5":
              isPostPage,
          },
        )}
      >
        <div
          className={clsx(
            "mb-1.5 flex flex-col gap-5 justify-self-end border-b border-b-gray-800 pb-2 max-[1100px]:order-2 max-[1100px]:max-w-[30ch] max-[1100px]:justify-self-center dark:border-b-gray-300",
            {
              "max-[1500px]:order-2 max-[1500px]:justify-self-center":
                isPostPage,
            },
          )}
        >
          <TwoLogosAndSlash />
          <p
            className={clsx(
              "text-end text-gray-800 max-[1100px]:text-center dark:text-gray-300",
              { "max-[1500px]:text-center": isPostPage },
            )}
          >
            © {year} Voccaria. All rights reserved.
          </p>
        </div>

        {/* Footer navigation sections */}
        <div
          className={clsx("flex justify-center gap-12 max-xl:gap-8", {
            "": isPostPage,
          })}
        >
          {footerLinks.map((section) => (
            <nav
              key={section.section}
              aria-labelledby={`${section.section}-heading`}
            >
              <h2
                id={`${section.section}-heading`}
                className="mb-2 text-base font-semibold text-gray-800 dark:text-white"
              >
                {section.section}
              </h2>
              <ul className="space-y-1">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm leading-[.5px] text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
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
            "mb-1.5 max-w-[28ch] justify-self-start border-b border-b-gray-800 pb-2 max-[1100px]:order-3 max-[1100px]:justify-self-center max-sm:w-full dark:border-b-gray-300",
            {
              "max-[1500px]:order-3 max-[1500px]:justify-self-center":
                isPostPage,
            },
          )}
        >
          <p
            className={clsx(
              "text-end text-lg text-gray-800 max-[1100px]:text-start max-md:text-base dark:text-gray-300",
              { "max-[1500px]:text-start": isPostPage },
            )}
          >
            This website is designed and built by{" "}
            <a
              className="text-my-pink-700 hover:text-my-pink-600 dark:text-my-pink-300 dark:hover:text-my-pink-400 font-medium transition-colors"
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
