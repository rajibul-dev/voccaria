import React from "react";
import clsx from "clsx";

// styles
import styles from "./overlay.module.css";

interface OverlayProps {
  children?: React.ReactNode;
  isOpen?: boolean;
}

const Overlay: React.FC<OverlayProps> = ({ children = null, isOpen }) => {
  return (
    <div className={clsx(styles.overlay, isOpen && styles.open)}>
      {children}
    </div>
  );
};

export default Overlay;
