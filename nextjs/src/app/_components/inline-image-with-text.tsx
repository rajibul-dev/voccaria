import React from "react";
import styles from "./inline-image-with-text.module.css";
import Image, { StaticImageData } from "next/image";

interface inlineImageWithTextProps {
  imgSrc: StaticImageData;
  children: React.ReactNode;
  imgAlt?: string;
}

const InlineImageWithText: React.FC<inlineImageWithTextProps> = ({
  imgSrc,
  children,
  imgAlt = "",
}) => {
  return (
    <span className={styles.wrapper}>
      <Image
        src={imgSrc}
        alt={imgAlt}
        className={styles.img}
        width={500}
        quality={80}
        priority
      />
      <span className={styles.text}>{children}</span>
    </span>
  );
};

export default InlineImageWithText;
