// styles
import HeadingPairStyles from "./headingpair.module.css";

interface HeadingPairProps {
  tertiary: string;
  heading: any;
  className?: string;
  tertiaryClassName?: string;
  isCentered?: boolean;
  moreMargin?: boolean;
}

const HeadingPair: React.FC<HeadingPairProps> = ({
  tertiary,
  heading,
  className = "",
  tertiaryClassName = "",
  isCentered = false,
  moreMargin = false,
}) => {
  return (
    <>
      <span
        className={`${HeadingPairStyles.tertiary} ${tertiaryClassName} ${
          isCentered ? HeadingPairStyles.center : ""
        }`}
      >
        {tertiary}
      </span>
      <h2
        className={`section-heading ${className} ${
          isCentered ? HeadingPairStyles.center : ""
        } ${moreMargin ? HeadingPairStyles.moreMargin : ""}`}
      >
        {heading}
      </h2>
    </>
  );
};

export default HeadingPair;
