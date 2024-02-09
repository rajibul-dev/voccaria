import Image from "next/image";

// styles
import styles from "./navbar.module.css";

// image and icon
import miaLogo from "../../../../public/images/mia-heart-logo.png";

// components
import DesktopNav from "./components/desktop-nav";

// page navigation data
const navData = [
  {
    name: "About Me",
    selector: "about",
  },
  {
    name: "Patreon",
    selector: "patreon",
  },
  {
    name: "Objective",
    selector: "objective",
  },
  {
    name: "Lesson Options",
    selector: "lesson-options",
  },
  {
    name: "Pricing",
    selector: "pricing",
  },
  {
    name: "Schedule a Lesson",
    selector: "scheduling",
  },
  {
    name: "Contact Me",
    selector: "contact",
  },
  {
    name: "Testimonials",
    selector: "testimonials",
  },
];

export default function Navbar() {
  return (
    <header className={styles.block}>
      <div className={`${styles.container}`}>
        <Image
          src={miaLogo}
          className={styles.logo}
          alt="Mia heart logo | Voccaria"
          placeholder="blur"
          blurDataURL="../../../../public/images/mia-heart-logo.png"
        />

        <DesktopNav links={navData} />
      </div>
    </header>
  );
}
