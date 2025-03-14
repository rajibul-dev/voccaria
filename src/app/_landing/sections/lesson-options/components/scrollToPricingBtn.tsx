"use client";

import styles from "../lessonOptions.module.css";

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
      Pricing & Lesson Types
    </button>
  );
}
