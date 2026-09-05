// styles
import styles from "./featureBox.module.css";

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import SubtleInfo from "@/app/_old-components/subtle-info";
import { ReactNode } from "react";
import type { ExternalDestination } from "@/_libs/analytics";
import TrackedExternalLink from "@/app/_components/TrackedExternalLink";

const circleIcon = <FontAwesomeIcon icon={faCircle} className={styles.icon} />;

// prop interface
interface FeatureBoxProps {
  heading: string;
  listItems: string[];
  button: { text: string; link: string; destination: ExternalDestination };
  brandColor?: boolean;
  lightInfo?: string | React.ReactNode;
  children?: ReactNode;
}

// component
const FeatureBox: React.FC<FeatureBoxProps> = ({
  heading,
  listItems,
  button,
  brandColor = false,
  lightInfo,
  children,
}) => {
  return (
    <div className={`${styles.box} ${brandColor ? styles.brand : styles.free}`}>
      <h3 className={`heading-h3 ${styles.heading}`}>{heading}</h3>

      <div className={styles.listNBtn}>
        <ul className={`goto-paragraph ${styles.list}`}>
          {listItems.map((item) => {
            return (
              <li className={styles.li} key={item}>
                {circleIcon}
                <span className={styles.para}>{item}</span>
              </li>
            );
          })}
        </ul>
        {children}
        <TrackedExternalLink
          className={`goto-paragraph ${styles.btn}`}
          href={button.link}
          destination={button.destination}
          sourceSection="lesson-options"
        >
          {button.text}
        </TrackedExternalLink>

        {lightInfo && (
          <SubtleInfo mode="dark" className={styles.lightInfo}>
            {lightInfo}
          </SubtleInfo>
        )}
      </div>
    </div>
  );
};

export default FeatureBox;
