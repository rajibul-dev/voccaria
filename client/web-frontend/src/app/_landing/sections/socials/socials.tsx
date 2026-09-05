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
import { ExternalDestination } from "@/_libs/analytics";

// social items object
const socialItems = [
  {
    name: "twitch",
    link: "https://www.twitch.tv/miavoiceteacher",
    expandedText: (
      <>
        I stream every Thursday!
        <br />
        Vocal Coach Reacts!
      </>
    ),
    icon: twitchIcon,
    bgColor: "#6441a5",
    isExpanded: false,
    destination: "twitch" as ExternalDestination,
  },
  {
    name: "youtube",
    link: "https://www.youtube.com/channel/UCP81Xp_j1hK2w1DbVvuItmQ",
    expandedText: "My YouTube Channel",
    icon: youtubeIcon,
    bgColor: "#FF0000",
    isExpanded: false,
    destination: "youtube" as ExternalDestination,
  },
  {
    name: "patreon",
    link: "https://www.patreon.com/MiaVoiceTeacher",
    expandedText: "My Patreon",
    icon: patreonIcon,
    bgColor: "#f96854",
    isExpanded: false,
    destination: "patreon" as ExternalDestination,
  },
  {
    name: "streamelements",
    link: "https://streamelements.com/miavoiceteacher/tip",
    expandedText: "My tipping page",
    icon: (
      <Image
        width={220}
        height={100}
        src="/images/streamelements-logo.png"
        alt="StreamElements logo"
        className={SocialsStyles.streamElementsLogo}
        // sizes="(min-width: 1980px) 57px, 46px"
        priority
      />
    ),
    bgColor: "#020923",
    isExpanded: false,
    destination: "streamelements" as ExternalDestination,
  },
  {
    name: "discord",
    link: "http://discordapp.com/users/140513822069882881",
    expandedText: "Contact me on Discord",
    icon: discordIcon,
    bgColor: "#5865f2",
    isExpanded: true,
    destination: "mia_discord" as ExternalDestination,
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
            destination={item.destination}
          />
        ))}
      </div>
    </section>
  );
}
