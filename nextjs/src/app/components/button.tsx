"use client";

import React from "react";

// styles
import ButtonStyles from "./button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  type?: string;
  size?: string;
  className?: string;
  onClick?: () => void;
  isBlock?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  href,
  type = "primary",
  size = "medium",
  isBlock = false,
  className = "",
  onClick = () => {
    console.log("button clicked");
  },
}) => {
  const displayStyle = {
    display: isBlock ? "block" : "inline-block",
    width: isBlock ? "100%" : "auto",
  };

  // anchor element
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        className={`${ButtonStyles.button} ${ButtonStyles[type]} ${ButtonStyles[size]} ${className}`}
        style={displayStyle}
      >
        {children}
      </a>
    );
  }

  // button element
  else {
    return (
      <button
        onClick={onClick}
        className={`${ButtonStyles.button} ${ButtonStyles[type]} ${ButtonStyles[size]} ${className}`}
        style={displayStyle}
      >
        {children}
      </button>
    );
  }
};

export default Button;
