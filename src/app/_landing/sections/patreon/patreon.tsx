import Image from "next/image";

// styles
import styles from "./patreon.module.css";

// image
import PatreonAvatar from "../../../../../public/images/mia-patron.png";
// import VoccariaLogoSrc from "../../../../../public/images/voccaria-logo.jpg";
// import VoccariaLogoSrcVOnly from "../../../../../public/images/voccaria-logo-v-only.jpg";

// components
import Button from "@/app/_components/button";
import HeadingPair from "@/app/_components/headingPair";
import { ListItem, UnorderedList } from "@chakra-ui/react";
// import InlineImageWithText from "@/app/components/inline-image-with-text";

const patreonFeatures = [
  "I will hear YOUR recordings and react to them live",
  "Early access to Youtube videos",
  ,
  "Gaming streams",
  ,
  "Super special watch-parties (secret guest!)",
  ,
  "Karaoke OR just me singing",
];

// component
export default function Patreon() {
  return (
    <section id="patreon" className={styles.section}>
      <div className={styles.container}>
        <Image
          className={styles.avatar}
          src={PatreonAvatar}
          alt="Mia voice teacher cartoon avatar"
          priority
          sizes="(min-width: 1100px) 280px, (min-width: 500px) 252px, (min-width: 460px) 224px, 65vw"
        />

        <div className={styles.textbox}>
          <HeadingPair
            tertiary="Patreon"
            heading={
              <>
                Support me on Patreon!
                <br />
                Get exclusive perks!
              </>
            }
            className={styles.heading}
            tertiaryClassName={styles.tertiary}
          />

          <UnorderedList
            fontWeight={500}
            spacing={3}
            lineHeight={1.5}
            className={styles.ul}
          >
            {patreonFeatures.map((item) => (
              <ListItem key={item}>{item}</ListItem>
            ))}
          </UnorderedList>

          <Button
            className={styles.btn}
            href="https://www.patreon.com/MiaVoiceTeacher"
          >
            To Patreon
          </Button>
        </div>
      </div>
    </section>
  );
}
