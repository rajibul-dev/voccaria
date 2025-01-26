import Image from "next/image";
import miaLogo from "/public/images/mia-heart-logo.png";

import styles from "./old-logo.module.css";

export default function OldLogo() {
  return (
    <Image
      src={miaLogo}
      className={`${styles.logo}`}
      alt="Mia heart logo | Voccaria"
      placeholder="blur"
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
      priority
    />
  );
}
