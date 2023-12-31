"use client"

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDiscord, faTwitch } from "@fortawesome/free-brands-svg-icons"
import { faHeart } from "@fortawesome/free-solid-svg-icons"

const discordIcon = (
  <FontAwesomeIcon icon={faDiscord} className={SocialsStyles.icon} />
)
const twitchIcon = (
  <FontAwesomeIcon icon={faTwitch} className={SocialsStyles.icon} />
)
const heartIcon = (
  <FontAwesomeIcon icon={faHeart} className={SocialsStyles.icon} />
)

// styles
import SocialsStyles from "./socials.module.css"

// components
import SocialButton from "./components/socialButton"

// social items object
const socialItems = [
  {
    name: "discord",
    link: "http://discordapp.com/users/140513822069882881",
    expandedText: "Contact me on Discord",
    icon: discordIcon,
    bgColor: "#5865f2",
    isExpanded: true,
  },
  {
    name: "twitch",
    link: "https://www.twitch.tv/miavoiceteacher",
    expandedText: "I stream every Monday! Vocal Coach Reacts!",
    icon: twitchIcon,
    bgColor: "#6441a5",
    isExpanded: false,
  },
  {
    name: "streamelements",
    link: "https://streamelements.com/miavoiceteacher/tip",
    expandedText: "My tipping page",
    icon: heartIcon,
    bgColor: "#fb3c6c",
    isExpanded: false,
  },
]

export default function socials() {
  return (
    <section id="socials" className={`block ${SocialsStyles.socialsSection}`}>
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
  )
}
