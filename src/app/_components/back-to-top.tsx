"use client";

import { useEffect, useState } from "react";

// styles
import styles from "./back-to-top.module.css";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const arrowUpIcon = (
  <FontAwesomeIcon icon={faArrowUp} className={styles.icon} />
);

const BackToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 10500;
      if (window.scrollY >= scrollThreshold) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    showButton && (
      <button
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
        className={styles.button}
      >
        {arrowUpIcon}
      </button>
    )
  );
};

export default BackToTop;
