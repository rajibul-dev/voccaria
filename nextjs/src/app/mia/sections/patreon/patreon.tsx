import Image from "next/image";

// styles
import PatreonStyles from "./patreon.module.css";

// image
import PatreonAvatar from "../../../../../public/images/mia-patron.png";

// components
import Button from "@/app/components/button";

// component
export default function Patreon() {
  return (
    <section
      className={PatreonStyles.section}
      id="patreon"
    >
      <div className={PatreonStyles.container}>
        {/* Image */}
        <Image
          className={PatreonStyles.avatar}
          src={PatreonAvatar}
          alt="Mia voice teacher cartoon avatar"
          priority={true}
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
    </section>
  );
}
