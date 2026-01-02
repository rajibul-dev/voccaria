import Image from "next/image";

import styles from "./old-logo.module.css";

export default function OldLogo() {
  return (
    <Image
      height={80}
      width={80}
      src="/images/mia-heart-logo.png"
      className={`${styles.logo}`}
      alt="Mia heart logo | Voccaria"
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
