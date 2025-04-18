import { Essay } from "@/app/_old-components/essay";
import AboutTextStyles from "./aboutText.module.css";

interface AboutTextProps {
  text: any[];
}

const AboutText: React.FC<AboutTextProps> = ({ text }) => {
  return (
    <div className={AboutTextStyles.aboutBox}>
      <h2 className={`section-heading ${AboutTextStyles.heading}`}>About Me</h2>
      <Essay className={AboutTextStyles.aboutText}>
        {text.map((para: any, index: number) => {
          return (
            <Essay.Para className="goto-paragraph" key={index}>
              {para}
            </Essay.Para>
          );
        })}
      </Essay>
    </div>
  );
};

export default AboutText;
