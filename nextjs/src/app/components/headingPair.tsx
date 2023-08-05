// styles
import HeadingPairStyles from "./headingpair.module.css"

interface HeadingPairProps {
  tertiary: string
  heading: string
  headingClassName?: string
  tertiaryClassName?: string
}

const HeadingPair: React.FC<HeadingPairProps> = ({
  tertiary,
  heading,
  headingClassName = "",
  tertiaryClassName = "",
}) => {
  return (
    <>
      <span className={`${HeadingPairStyles.tertiary} ${tertiaryClassName}`}>
        {tertiary}
      </span>
      <h2 className={`section-heading ${headingClassName}`}>{heading}</h2>
    </>
  )
}

export default HeadingPair
