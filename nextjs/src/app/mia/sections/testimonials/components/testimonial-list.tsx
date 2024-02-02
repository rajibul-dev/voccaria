import React from "react";

// styles
import styles from "./testimonial-list.module.css";
import TestimonialItem from "./testimonial-item";

interface TestimonialListProps {
  testimonials: any;
}

const TestimonialList: React.FC<TestimonialListProps> = ({ testimonials }) => {
  return (
    <ul className={styles.list}>
      {testimonials.map((item: any) => (
        <TestimonialItem
          item={item}
          key={item.message}
        />
      ))}
    </ul>
  );
};

export default TestimonialList;
