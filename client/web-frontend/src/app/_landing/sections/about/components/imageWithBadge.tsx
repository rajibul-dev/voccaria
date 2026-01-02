import Image, { StaticImageData } from "next/image";

import ImgWithBadgeStyles from "./imgwithbadge.module.css";

interface ImageWithBadgeProps {
  srcImage: string;
  srcBadge: string;
}

const ImageWithBadge: React.FC<ImageWithBadgeProps> = ({
  srcImage,
  srcBadge,
}) => {
  return (
    <div className={ImgWithBadgeStyles.imgBox}>
      <Image
        width={1300}
        height={300}
        className={ImgWithBadgeStyles.miaImg}
        src={srcImage}
        sizes="(min-width: 1380px) calc(-3.95vw + 510px), (min-width: 900px) calc(30vw + 47px), (min-width: 580px) 54vw, (min-width: 500px) 81.67vw, 75.56vw"
        alt="Mia Image"
        blurDataURL="@/public/images/Mia.jpeg"
        priority
      />
      <Image
        width={1300}
        height={300}
        className={ImgWithBadgeStyles.badge}
        src={srcBadge}
        // sizes="(min-width: 1380px) calc(-1.36vw + 171px), (min-width: 900px) calc(10vw + 16px), (min-width: 580px) 18vw, (min-width: 500px) 26.67vw, 25vw"
        alt="Mia's new york vocal coaching voice teaching training certification badge"
        blurDataURL="@/public/images/vtt-badge.png"
        priority
      />
    </div>
  );
};

export default ImageWithBadge;
