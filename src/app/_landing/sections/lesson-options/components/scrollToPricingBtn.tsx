"use client";

import styles from "../lessonOptions.module.css";
import { GoArrowUpRight } from "react-icons/go";

function scrollToPricing() {
  // @ts-ignore
  const headerHeight = document.querySelector("#header")?.offsetHeight || 0;
  const pricingSection = document.querySelector("#pricing");

  if (pricingSection) {
    window.scrollTo({
      // @ts-ignore
      top: pricingSection.offsetTop - headerHeight, // Adjust for header
      behavior: "smooth",
    });
  }
}

export default function ScrollToPricingBtn() {
  return (
    <button onClick={scrollToPricing} className={styles.scrolToPricingBtn}>
      <span>Pricing & Lesson Types</span>
      <GoArrowUpRight
        style={{
          transform: "translateY(1.5px)",
        }}
        size={20}
        strokeWidth={1.5}
      />
    </button>
  );
}
