import AboutTextStyles from "./aboutText.module.css"

interface AboutTextProps {
  text: string[]
}

const AboutText: React.FC<AboutTextProps> = ({ text }) => {
  return (
    <div className={AboutTextStyles.aboutBox}>
      <h2 className={`section-heading ${AboutTextStyles.heading}`}>About Me</h2>
      <div className={AboutTextStyles.aboutText}>
        {text.map((para: string, index: number) => {
          return (
            <p className="goto-paragraph" key={index}>
              {para}
            </p>
          )
        })}
      </div>
    </div>
  )
}

export default AboutText
