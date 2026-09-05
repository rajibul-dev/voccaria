// styles
import styles from "./schedule-buttons.module.css";
import { ExternalDestination } from "@/_libs/analytics";
import TrackedExternalLink from "@/app/_components/TrackedExternalLink";

interface ScheduleButtonsProps {
  schedulingData: {
    name: string;
    description: string;
    link: string;
    buttonLabel: string;
    destination: ExternalDestination;
  }[];
}

const ScheduleButtons: React.FC<ScheduleButtonsProps> = ({
  schedulingData,
}) => {
  return (
    <div className={styles.wrapper}>
      {schedulingData.map((item) => {
        return (
          <TrackedExternalLink
            className={styles.item}
            key={item.name}
            href={item.link}
            destination={item.destination}
            sourceSection="scheduling"
          >
            <h3 className={`heading-h3 ${styles.heading}`}>{item.name}</h3>
            <p className={`goto-paragraph ${styles.description}`}>
              {item.description}
            </p>
          </TrackedExternalLink>
        );
      })}
    </div>
  );
};

export default ScheduleButtons;
