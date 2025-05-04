import miaHeartLogo from "/public/images/mia-heart-logo.png";
import voccariaLogo from "/public/images/logo-voccaria.png";
import Image from "next/image";

export default function TwoLogosAndSlash() {
  return (
    <div className="relative flex items-center justify-end">
      <Image
        src={miaHeartLogo}
        alt="Mia heart logo | Voccaria"
        className="mr-6 w-20 max-[1100px]:w-16"
      />

      {/* Slash */}
      <div className="h-20 w-[1px] shrink-0 rotate-25 bg-gray-500 dark:bg-gray-300"></div>

      <Image
        src={voccariaLogo}
        alt="Voccaria logo"
        className="ml-6 w-55 max-[1100px]:w-44 dark:brightness-105"
      />
    </div>
  );
}
