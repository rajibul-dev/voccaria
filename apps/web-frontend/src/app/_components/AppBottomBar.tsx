import clsx from "clsx";

export default function AppBottomBar() {
  return (
    <nav
      className={clsx(
        "border-t border-inherit [grid-area:bottom-bar] sm:hidden",
        "h-5",
      )}
    >
      Bottom Bar
    </nav>
  );
}
