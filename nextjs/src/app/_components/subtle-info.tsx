import styles from "./subtle-info.module.css";

import React from "react";

interface SubtleInfoProps {
  children: React.ReactNode;
  mode?: string;
  className?: string;
}

const SubtleInfo: React.FC<SubtleInfoProps> = ({
  children,
  mode = "light",
  className,
}) => {
  return (
    <span className={`${styles.text} ${styles[mode]} ${className}`}>
      {children}
    </span>
  );
};

export default SubtleInfo;
