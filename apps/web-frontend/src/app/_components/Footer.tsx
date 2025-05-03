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
    <footer className="bg-gray-300 py-8 dark:bg-gray-700">
      <div className="grid grid-cols-3 items-center justify-center px-3">
        <div className="flex flex-col gap-5 border-b border-b-gray-700 pb-2 dark:border-b-gray-300">
          <TwoLogosAndSlash />
          <p className="text-end text-gray-700 dark:text-gray-300">
            © {year} Voccaria. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
