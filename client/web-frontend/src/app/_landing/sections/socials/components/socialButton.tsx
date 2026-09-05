"use client";

// styles
import socialButtonStyles from "./social-button.module.css";
// @ts-ignore
import "./odds.css";
import { analytics, ExternalDestination } from "@/_libs/analytics";

interface SocialButtonProps {
  icon: any;
  text: any;
  backgroundColor: string;
  className: string;
  link: string;
  destination: ExternalDestination;
}

const socialButton: React.FC<SocialButtonProps> = ({
  icon,
  text,
  backgroundColor,
  className,
  link,
  destination,
}) => {
  const styles = {
    backgroundColor,
    color: "#fff",
    display: "inline-block",
    fontSize: "1.8rem",
  };

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      style={{ ...styles }}
      className={`${className} ${socialButtonStyles.button}`}
      onClick={() => analytics.externalLinkClicked(destination, "socials")}
    >
      <span className={`icon-box ${socialButtonStyles.iconBox}`}>{icon}</span>
      <span className={`text ${socialButtonStyles.text}`}>{text}</span>
    </a>
  );
};

export default socialButton;
