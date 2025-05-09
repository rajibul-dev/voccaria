// Mia's about text
const aboutMiaText = [
  <>
    I'm Mia, a holistic voice teacher who's been singing since age 10 and
    teaching on a paid and pro bono basis since 2019. My teaching integrates
    vocal technique, anatomy-informed exercises, and attention to physical and
    mental well-being, empowering students to sing and speak comfortably and
    sustainably.
  </>,
  <>
    My formal studies include the{" "}
    <strong>New York Vocal Coaching Teacher-Training Course</strong>, ongoing
    study with Aliki Katriou (anatomy & distortion) and learning about
    Feldenkrais through the{" "}
    <strong>The Singing Self Program Teacher Track with Robert Sussuma</strong>.
    Earlier in my career I trained with <strong>Silva Makamian</strong>{" "}
    (musical-theatre & pop). I also draw on ideas and exercises inspired by
    voice scientist <strong>Brian Gill</strong>.
  </>,
  <>
    My background in psychology and vocal pedagogy helps me connect technical
    concepts with the individual needs of singers, speakers, actors, and
    educators. I am well-equipped to teach individuals with general joint
    hypermobility, GERD, ADHD/ADD, and those on the autism spectrum. I firmly
    believe that posture, physical well-being, and mental health are essential
    for both exceptional singing and a fulfilling life.
  </>,
  <>
    My approach blends intuitive teaching with anatomy-based methods inspired by{" "}
    <strong>Resonant Voice Therapy</strong>, emphasizing relaxed and{" "}
    <strong>tension-free sound production</strong>. Having personally navigated
    vocal challenges due to general joint hypermobility, excessive tension,
    vocal and physical fatigue and stress, I specialize in helping singers,
    actors, speakers, and voice rehabilitation clients find comfort,
    consistency, and ease in their voices. I also specialize in safely expanding
    a powerful vocal range, including developing strong upper mix and belting
    technique, accessing and refining the highest registers (flageolet, whistle;
    M3, M4), and helping bass singers fine-tune their technique or reach even
    lower notes.
  </>,
  <>
    My goal is to empower you with practical tools and techniques, enabling you
    to better understand your voice, confidently self-assess, and sing or speak
    comfortably for life.
  </>,
];

const FLEXIFIED_PARA_COUNT = 2;

const moreAboutMeContent = {
  heading: "My teaching style: casual chat, hardcore science",
  paragraph:
    "I keep the energy relaxed and conversational, but nothing is guess-work. Instead of vague “sing from your diaphragm” cues, we pinpoint which muscles should (and shouldn’t) be working, then test everything in real time – exercises and songs - until it feels easy.",
  features: {
    heading: "Core pillars you’ll master with me:",
    bulletPoints: [
      "Efficient breathing",
      "Tongue / lip / jaw positioning",
      "Spotting and removing throat tension/discomfort",
      "Self-diagnosing at home (“Why am I cracking now?”)",
      "Musicality, emotion, harmonies & performing",
      "Safe, step-by-step range and power building",
    ],
  },
};

// Styles
import AboutStyles from "./about.module.css";

// components
import ImageWithBadge from "./components/imageWithBadge";

// images..
import MiaImage from "/public/images/Mia.jpeg";
import MiaBadge from "/public/images/vtt-badge.png";
import AboutTextFlexified from "./components/AboutTextFlexified";
import MoreAboutMe from "./components/MoreAboutMe";
import RestAboutText from "./components/RestAboutText";

// component
export default function About() {
  return (
    <section id="about" className={`${AboutStyles.about}`}>
      <div className="mx-auto flex max-w-[130rem] flex-col items-center justify-center gap-[3rem] px-[5%] max-[900px]:gap-[1.4rem]">
        <div
          className={`max-[900px]:align-center grid grid-cols-[1fr_1.3fr] items-start justify-between gap-[4rem] max-[900px]:grid-cols-1 max-[900px]:justify-center max-[900px]:gap-[4.8rem]`}
        >
          <ImageWithBadge srcImage={MiaImage} srcBadge={MiaBadge} />
          <AboutTextFlexified
            text={aboutMiaText.slice(0, FLEXIFIED_PARA_COUNT)}
          />
        </div>
        <div
          className={`mx-auto max-w-[72rem] max-[900px]:max-w-[78ch] max-[832px]:mb-[-10rem] max-[532px]:mb-0`}
        >
          <RestAboutText content={aboutMiaText.slice(FLEXIFIED_PARA_COUNT)} />
          <MoreAboutMe information={moreAboutMeContent} />
        </div>
      </div>
    </section>
  );
}
