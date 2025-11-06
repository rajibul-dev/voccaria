import clsx from "clsx";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

export default function NavbarLoginButton({
  isRoot = false,
  isAuthenticated = false,
  authLoading = false,
}: {
  isRoot?: boolean;
  isAuthenticated?: boolean;
  authLoading?: boolean;
}) {
  return (
    <Link
      href={!isAuthenticated ? "/auth/login" : "/app/dashboard"}
      className={clsx(
        `bg-old-btn-pink hover:bg-old-btn-pink-hover attractive-text-shadow flex cursor-pointer items-center gap-1.5 rounded-full px-7.5 py-2.5 text-base font-bold text-white transition-colors`,
        {
          "gap-[0.6rem] px-[3rem] py-[1rem] text-[1.6rem]": isRoot,
          "max-[500px]:px-6 max-[500px]:py-2 max-[500px]:text-[.8rem]": !isRoot,
        },
      )}
    >
      {!isAuthenticated ? (
        <span>
          Login<span className="max-[670px]:hidden"> | Register</span>
        </span>
      ) : (
        <span>Open App</span>
      )}
      <FaArrowRight
        strokeWidth={1}
        className={clsx(
          "text-xl [filter:drop-shadow(0px_1px_0px_rgb(0_0_0_/_0.15))]",
          {
            "mt-[0px] text-[2rem]": isRoot,
            "max-[500px]:text-base": !isRoot,
          },
        )}
      />
    </Link>
  );
}
