interface FeatureProps {
  features: any[];
}

// styles
import styles from "./features.module.css";

const Features: React.FC<FeatureProps> = ({ features }) => {
  return (
    <ul className={styles.paras}>
      {features.map((para, i) => (
        <li
          className={`goto-paragraph`}
          key={i}
        >
          {para}
        </li>
      ))}
    </ul>
  );
};

export default Features;
