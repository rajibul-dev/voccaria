import Image from "next/image";
import logoImg from "/public/images/logo-voccaria.png";
import Link from "next/link";
import clsx from "clsx";

export default function Logo({
  pathname = "",
  className = "",
}: {
  pathname?: string;
  className?: string;
}) {
  const isPostPage = pathname.startsWith(`/blog/`);

  return (
    <div className={clsx({ "mr-auto": isPostPage })}>
      <Link href={"/"}>
        <Image
          src={logoImg}
          className={clsx(
            "w-38 -translate-y-0.5 max-sm:w-30 dark:brightness-105",
            className,
          )}
          alt="Voccaria logo"
          priority
        />
      </Link>
    </div>
  );
}
