interface FeatureProps {
  features: any[]
}

// styles
import FeatureStyles from "./features.module.css"

const Features: React.FC<FeatureProps> = ({ features }) => {
  return (
    <ul className={FeatureStyles.paras}>
      {features.map((para, i) => (
        <li className={`goto-paragraph`} key={i}>
          {para}
        </li>
      ))}
    </ul>
  )
}

export default Features
