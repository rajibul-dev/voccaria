interface MoreAboutMeInformationInterface {
  heading: string;
  paragraph: string;
  features: {
    heading: string;
    bulletPoints: string[];
  };
}

interface MoreAboutMeProps {
  information: MoreAboutMeInformationInterface;
}

export default function MoreAboutMe({ information }: MoreAboutMeProps) {
  return (
    <>
      <h2 className="mb-[1.4rem] text-[2.8rem] font-bold">
        {information.heading}
      </h2>
      <p className="goto-paragraph">{information.paragraph}</p>
      <h3 className="goto-paragraph mt-[1.6rem] mb-[.8rem] font-bold">
        {information.features.heading}
      </h3>
      <ul>
        {information.features.bulletPoints.map((point, index) => (
          <li key={index} className="goto-paragraph not-last:mb-[.2rem]">
            <p>
              <span className="inline-block translate-y-[2px] text-[3rem] leading-0 font-bold">
                •
              </span>{" "}
              {point}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
