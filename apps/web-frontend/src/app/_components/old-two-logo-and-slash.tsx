import miaHeartLogo from "/public/images/mia-heart-logo.png";
import voccariaLogo from "/public/images/logo-voccaria.png";
import Image from "next/image";

export default function OldTwoLogosAndSlash() {
  return (
    <div className="relative flex items-center justify-end">
      <Image
        src={miaHeartLogo}
        alt="Mia heart logo | Voccaria"
        className="mr-[2.4rem] w-[8rem] max-[1100px]:w-[6.4rem] max-lg:w-[8rem]"
      />

      {/* Slash */}
      <div className="h-[8rem] w-[1px] shrink-0 rotate-25 bg-gray-300"></div>

      <Image
        src={voccariaLogo}
        alt="Voccaria logo"
        className="ml-[2.4rem] w-[22rem] brightness-105 max-[1100px]:w-[17.6rem] max-lg:w-[23rem]"
      />
    </div>
  );
}
