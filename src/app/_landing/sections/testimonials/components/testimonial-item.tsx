import React from "react";

// styles
import styles from "./testimonial-item.module.css";

interface TestimonialItemProps {
  item: any;
}

const TestimonialItem: React.FC<TestimonialItemProps> = ({ item }) => {
  return (
    <li className={styles.item}>
      <blockquote className={`goto-paragraph ${styles.message}`}>
        {item.message}
      </blockquote>
      <span className={`goto-paragraph ${styles.name}`}>
        &mdash; {item.name}
      </span>
    </li>
  );
};

export default TestimonialItem;
