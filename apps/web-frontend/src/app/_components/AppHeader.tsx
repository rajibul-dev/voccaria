import AccountMenu from "./AccountMenu";
import DarkModeToggler from "./DarkModeToggler";
import Logo from "./Logo";

export default function AppHeader() {
  return (
    <header
      className={`h-18 border-b border-inherit bg-white [grid-area:header] max-xl:h-16.5 max-sm:h-14.5 dark:bg-gray-800`}
    >
      <div className="mx-auto flex h-full max-w-9/10 items-center justify-between gap-5">
        <Logo />
        <DarkModeToggler />
        <AccountMenu />
      </div>
    </header>
  );
}
