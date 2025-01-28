import Image from "next/image";
import logoImg from "/public/images/logo-voccaria.png";
import Link from "next/link";

export default function Logo() {
  return (
    <div>
      <Link href={"/"}>
        <Image
          src={logoImg}
          className="w-45 -translate-y-1"
          alt="Voccaria logo"
          priority
        />
      </Link>
    </div>
  );
}
