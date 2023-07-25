import Image, { StaticImageData } from "next/image";

import ImgWithBadgeStyles from "./imgwithbadge.module.css";

interface ImageWithBadgeProps {
  srcImage: StaticImageData;
  srcBadge: StaticImageData;
}

const ImageWithBadge: React.FC<ImageWithBadgeProps> = ({
  srcImage,
  srcBadge,
}) => {
  return (
    <div className={ImgWithBadgeStyles.imgBox}>
      <Image
        className={ImgWithBadgeStyles.miaImg}
        src={srcImage}
        alt="Mia Image"
        priority
      />
      <Image
        className={ImgWithBadgeStyles.badge}
        src={srcBadge}
        alt="Mia's new york vocal coaching voice teaching training certification badge"
      />
    </div>
  );
};

export default ImageWithBadge;
