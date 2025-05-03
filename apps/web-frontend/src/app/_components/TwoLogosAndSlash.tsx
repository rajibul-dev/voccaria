import miaHeartLogo from "/public/images/mia-heart-logo.png";
import voccariaLogo from "/public/images/logo-voccaria.png";
import Image from "next/image";

export default function TwoLogosAndSlash() {
  return (
    <div className="flex items-center justify-end gap-5">
      <Image
        src={miaHeartLogo}
        alt="Mia heart logo | Voccaria"
        className="w-20"
      />

      {/* Slash */}
      <div className="h-20 w-[1px] rotate-25 bg-gray-500"></div>

      <Image src={voccariaLogo} alt="Voccaria logo" className="w-55" />
    </div>
  );
}
