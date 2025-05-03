import Link from "next/link";
import TwoLogosAndSlash from "./TwoLogosAndSlash";

export const footerLinks = [
  {
    section: "Website",
    links: [
      { name: "About Mia", href: "#" },
      { name: "Blog", href: "/blog" },
      { name: "Free lesson info", href: "#lesson-options" },
      {
        name: "Apply for paid lessons",
        href: "https://docs.google.com/forms/d/1dW-N6xyf7ATc6zCIL0rR1I63EN4A4U6JghhPA6xi2pM/viewform?edit_requested=true",
      },
      { name: "Buy paid lessons", href: "#pricing" },
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
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-700 pt-18 pb-14">
      <div className="grid grid-cols-3 items-end justify-center gap-12 px-3">
        <div className="mb-1.5 flex flex-col gap-5 border-b border-b-gray-300 pb-2">
          <TwoLogosAndSlash />
          <p className="text-end text-gray-300">
            © {year} Voccaria. All rights reserved.
          </p>
        </div>

        {/* Footer navigation sections */}
        <div className="flex justify-center gap-12">
          {footerLinks.map((section) => (
            <nav
              key={section.section}
              aria-labelledby={`${section.section}-heading`}
            >
              <h2
                id={`${section.section}-heading`}
                className="mb-2 text-base font-semibold text-white"
              >
                {section.section}
              </h2>
              <ul className="space-y-1">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.href.startsWith("/") || link.href.startsWith("#") ? (
                      <Link
                        href={link.href}
                        className="text-sm text-gray-300 transition-colors hover:text-white"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-300 transition-colors hover:text-white"
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Showing my portfolio */}
        <div className="mb-1.5 max-w-[28ch] border-b border-b-gray-300 pb-2">
          <p className="text-end text-lg text-gray-300">
            This website is designed and built by{" "}
            <a
              className="text-my-pink-400 hover:text-my-pink-300 font-medium transition-colors"
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
