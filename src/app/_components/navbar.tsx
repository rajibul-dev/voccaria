"use client";

// styles
import styles from "./navbar.module.css";

// components
import OldLogo from "@/app/_components/OldLogo";
import OldPageSectionTracking from "./OldPageSectionTracking";

interface NavbarProps {
  pathname: string;
  isRoot: boolean;
}

export default function Navbar({ pathname, isRoot }: NavbarProps) {
  return (
    <header className={`${isRoot ? styles.block : ""}`}>
      <div className={`${isRoot ? styles.container : ""}`}>
        {isRoot && <OldLogo />}

        {isRoot && <OldPageSectionTracking />}
      </div>
    </header>
  );
}
