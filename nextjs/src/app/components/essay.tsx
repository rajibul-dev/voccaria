import React, { ReactNode } from "react";

// styles
import styles from "./essay.module.css";

interface EssayProps {
  children: ReactNode;
  className?: string;
}
interface ParaProps {
  children: ReactNode;
  className?: string;
}

const Essay: React.FC<EssayProps> & {
  Para: React.FC<ParaProps>;
} = ({ children, className = "" }) => {
  return <div className={`${styles.wrapper} ${className}`}>{children}</div>;
};

const Para: React.FC<ParaProps> = ({ children, className = "" }) => {
  return (
    <p className={`goto-paragraph ${styles.para} ${className}`}>{children}</p>
  );
};

Essay.Para = Para;

export { Essay, Para };
