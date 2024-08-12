import Image from "next/image";

// styles
import PatreonStyles from "./patreon.module.css";

// image
import PatreonAvatar from "../../../../../public/images/mia-patron.png";
// import VoccariaLogoSrc from "../../../../../public/images/voccaria-logo.jpg";
// import VoccariaLogoSrcVOnly from "../../../../../public/images/voccaria-logo-v-only.jpg";

// components
import Button from "@/app/components/button";
// import InlineImageWithText from "@/app/components/inline-image-with-text";

// component
export default function Patreon() {
  return (
    <aside className={PatreonStyles.section}>
      <div className={PatreonStyles.container}>
        {/* Image */}
        <Image
          className={PatreonStyles.avatar}
          src={PatreonAvatar}
          alt="Mia voice teacher cartoon avatar"
          priority
          sizes="(min-width: 1100px) 280px, (min-width: 500px) 252px, (min-width: 460px) 224px, 65vw"
        />

        {/* Text and buttons */}
        <div className={PatreonStyles.textbox}>
          <h3 className={PatreonStyles.heading}>
            Support me on Patreon!
            <br />
            Get exclusive perks!
          </h3>
          <Button
            className={PatreonStyles.btn}
            href="https://www.patreon.com/MiaVoiceTeacher"
          >
            To Patreon
          </Button>
        </div>
      </div>
    </aside>
  );
}
