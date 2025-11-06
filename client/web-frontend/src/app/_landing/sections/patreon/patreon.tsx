import Image from "next/image";

// styles
import styles from "./patreon.module.css";

// image
import PatreonAvatar from "/public/images/mia-patron.png";

// components
import Button from "@/app/_old-components/button";
import HeadingPair from "@/app/_old-components/headingPair";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const patreonFeatures = [
  "Early access to Youtube videos",
  "Gaming streams and watch parties (with and without super secret guest)",
  ,
  "Karaoke OR Miaoke - you get to see my recording/practice process",
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
                Get exclusive perks and access to a closed, smaller community!
              </>
            }
            className={styles.heading}
            tertiaryClassName={styles.tertiary}
          />

          <ul
            role="list"
            className={`flex flex-col gap-3.5 font-medium ${styles.ul}`}
          >
            {patreonFeatures.map((item) => (
              <li className="flex gap-4" key={item}>
                <FontAwesomeIcon
                  icon={faCircle}
                  className="w-3 translate-y-[5px]"
                />
                <p className="max-w-[44ch] leading-[1.7]">{item}</p>
              </li>
            ))}
          </ul>

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
