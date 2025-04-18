// Mia's about text
const aboutMiaText = [
  <>
    I have been offering voice lessons on a paid and pro bono basis since 2019.
    Continuously honing my skills, I have trained with teachers Silva Makamian
    (opera, pop) and Aliki Katriou (distortion) and completed the New York Vocal
    Coaching Teacher Training Course. My approach, heavily inspired by
    Feldenkrais, is now further enhanced through my enrollment in the Robert
    Sussuma Teacher Training Program. Additionally, I actively study Brian Gill
    {`'`}s work and learn from the teachers he has trained.
  </>,
  <>
    My teaching approach emphasizes minimizing tension, enabling the body to
    produce powerful, natural sounds. I specialize in coaching the highest
    registers of the voice, extending range and tone to their full potential,
    and cultivating an effortless mixed voice—my unique {`"`}One Voice{`"`}{" "}
    approach.
  </>,
  <>
    I studied Psychology and Vocal Pedagogy at university and I am well-equipped
    to teach individuals with general joint hypermobility, GERD, ADHD/ADD, and
    those on the autism spectrum. I firmly believe that posture, physical
    well-being, and mental health are essential for both exceptional singing and
    a fulfilling life.
  </>,
  <>
    As a voice teacher, I help beginners grasp the fundamentals efficiently and
    effortlessly. As a vocal coach, I specialize in Pop and confidently teach
    all microphone genres.
  </>,
  <>I can{`'`}t wait to work with you!</>,
];

// Styles
import AboutStyles from "./about.module.css";

// components
import ImageWithBadge from "./components/imageWithBadge";

// images..
import MiaImage from "/public/images/Mia.jpeg";
import MiaBadge from "/public/images/vtt-badge.png";
import AboutText from "./components/aboutText";

// component
export default function About() {
  return (
    <section id="about" className={`${AboutStyles.about}`}>
      <div className={`old-container ${AboutStyles.container}`}>
        <ImageWithBadge srcImage={MiaImage} srcBadge={MiaBadge} />
        <AboutText text={aboutMiaText} />
      </div>
    </section>
  );
}
