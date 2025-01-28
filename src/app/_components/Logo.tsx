import Image from "next/image";
import logoImg from "/public/images/logo-voccaria.png";
import Link from "next/link";

export default function Logo() {
  return (
    <div>
      <Link href={"/"}>
        <Image
          src={logoImg}
          className="w-38 max-sm:w-30 -translate-y-0.5"
          alt="Voccaria logo"
          priority
        />
      </Link>
    </div>
  );
}
