// styles
import Button from "@/app/components/button";
import styles from "./schedule-buttons.module.css";

interface ScheduleButtonsProps {
  schedulingData: {
    name: string;
    description: string;
    link: string;
    buttonLabel: string;
  }[];
}

const ScheduleButtons: React.FC<ScheduleButtonsProps> = ({
  schedulingData,
}) => {
  return (
    <div className={styles.wrapper}>
      {schedulingData.map((item) => {
        return (
          <a
            className={styles.item}
            key={item.name}
            href={item.link}
            target="_blank"
          >
            <h3 className={`heading-h3 ${styles.heading}`}>{item.name}</h3>
            <p className={`goto-paragraph ${styles.description}`}>
              {item.description}
            </p>
          </a>
        );
      })}
    </div>
  );
};

export default ScheduleButtons;
