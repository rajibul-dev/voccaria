import miaHeartLogo from "/public/images/mia-heart-logo.png";
import voccariaLogo from "/public/images/logo-voccaria.png";
import Image from "next/image";
import clsx from "clsx";
import { wantDarkFooter } from "../_old-components/old-footer";

export default function OldTwoLogosAndSlash() {
  return (
    <div className="relative flex items-center justify-end">
      <Image
        src={miaHeartLogo}
        alt="Mia heart logo | Voccaria"
        className="mr-[2.4rem] w-[8rem] max-[1100px]:w-[6.4rem] max-lg:w-[8rem]"
      />

      {/* Slash */}
      <div
        className={clsx(
          "h-[8rem] w-[1px] shrink-0 rotate-25 bg-gray-700",
          wantDarkFooter && "dark:bg-gray-300",
        )}
      ></div>

      <Image
        src={voccariaLogo}
        alt="Voccaria logo"
        className={clsx(
          "ml-[2.4rem] w-[22rem] max-[1100px]:w-[17.6rem] max-lg:w-[23rem]",
          wantDarkFooter && "dark:brightness-105",
        )}
      />
    </div>
  );
}
