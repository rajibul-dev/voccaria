// "use client";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faTwitch,
  faPatreon,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
// import { faHeart } from "@fortawesome/free-solid-svg-icons";
import streamElementsIcon from "/public/images/streamelements-logo.png";

const discordIcon = (
  <FontAwesomeIcon icon={faDiscord} className={SocialsStyles.icon} />
);
const twitchIcon = (
  <FontAwesomeIcon icon={faTwitch} className={SocialsStyles.icon} />
);
const patreonIcon = (
  <FontAwesomeIcon icon={faPatreon} className={SocialsStyles.icon} />
);
const youtubeIcon = (
  <FontAwesomeIcon icon={faYoutube} className={SocialsStyles.icon} />
);
// const heartIcon = (
//   <FontAwesomeIcon
//     icon={faHeart}
//     className={SocialsStyles.icon}
//   />
// );

// styles
import SocialsStyles from "./socials.module.css";

// components
import SocialButton from "./components/socialButton";
import Image from "next/image";

// social items object
const socialItems = [
  {
    name: "twitch",
    link: "https://www.twitch.tv/miavoiceteacher",
    expandedText: (
      <>
        I stream every TUE and THU!
        <br />
        Vocal Coach Reacts!
      </>
    ),
    icon: twitchIcon,
    bgColor: "#6441a5",
    isExpanded: false,
  },
  {
    name: "youtube",
    link: "https://www.youtube.com/channel/UCP81Xp_j1hK2w1DbVvuItmQ",
    expandedText: "My YouTube Channel",
    icon: youtubeIcon,
    bgColor: "#FF0000",
    isExpanded: false,
  },
  {
    name: "patreon",
    link: "https://www.patreon.com/MiaVoiceTeacher",
    expandedText: "My Patreon",
    icon: patreonIcon,
    bgColor: "#f96854",
    isExpanded: false,
  },
  {
    name: "streamelements",
    link: "https://streamelements.com/miavoiceteacher/tip",
    expandedText: "My tipping page",
    icon: (
      <Image
        src={streamElementsIcon}
        alt="StreamElements logo"
        placeholder="blur"
        className={SocialsStyles.streamElementsLogo}
        // sizes="(min-width: 1980px) 57px, 46px"
        priority
      />
    ),
    bgColor: "#020923",
    isExpanded: false,
  },
  {
    name: "discord",
    link: "http://discordapp.com/users/140513822069882881",
    expandedText: "Contact me on Discord",
    icon: discordIcon,
    bgColor: "#5865f2",
    isExpanded: true,
  },
];

export default function socials() {
  return (
    <section
      id="socials"
      className={`section-block ${SocialsStyles.socialsSection}`}
    >
      <div className={SocialsStyles.wrapper}>
        {socialItems.map((item) => (
          <SocialButton
            key={item.name}
            icon={item.icon}
            text={item.expandedText}
            backgroundColor={item.bgColor}
            link={item.link}
            className={item.name}
          />
        ))}
      </div>
    </section>
  );
}
