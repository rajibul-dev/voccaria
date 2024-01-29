// styles
import socialButtonStyles from "./social-button.module.css";
import "./odds.css";

interface SocialButtonProps {
  icon: any;
  text: string;
  backgroundColor: string;
  className: string;
  link: string;
}

const socialButton: React.FC<SocialButtonProps> = ({
  icon,
  text,
  backgroundColor,
  className,
  link,
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
      style={{ ...styles }}
      className={`${className} ${socialButtonStyles.button}`}
    >
      <span className={`icon-box ${socialButtonStyles.iconBox}`}>{icon}</span>
      <span className={`text ${socialButtonStyles.text}`}>{text}</span>
    </a>
  );
};

export default socialButton;
