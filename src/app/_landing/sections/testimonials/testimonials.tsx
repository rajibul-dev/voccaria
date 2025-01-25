// styles
import TestimonialList from "./components/testimonial-list";
import styles from "./testimonials.module.css";

// components
import HeadingPair from "@/app/_components/headingPair";

// testimonials
const testimonials = [
  {
    name: "Kelly",
    message:
      "Mia is amazing! She has done so much to help me find more confidence and power with my voice. She is very patient and kind, and is extremely effective at explaining things clearly. I really love how much she personalizes lessons and helps you understand some of the science behind singing—whenever I struggled with a new technique, so she did so much to help me pinpoint exactly what was holding me back and how to fix it. She is very smart and talented, and she’s definitely the best vocal teacher I’ve ever had! 🙂",
  },
  {
    name: "Raven",
    message:
      "Mia is a wonderful coach! I'm so glad I happen to bump into one of her many helpful posts on reddit. She guided me through learning to unlock a new voice within me. This made it so much more comfortable to sing in general. Mia has helped me develop a new relationship with my voice and singing, and now can envision a brighter future in my life journey with it. She is so supportive while still being able to call you out directly when you know you're doing something wrong. Definitely would recommend her if you're looking to improve yourself!",
  },
  {
    name: "Fisk",
    message:
      "I've been one of Mia's students for several months now, and I can't recommend her enough. Before we began lessons, I was having horrible pain in my throat when I sang, and it even hurt to talk. She helped me be able to sing without pain. It was something I was desperate to fix and had gone to several doctors asking for help. One had suggested a singing teacher, and I feel like I could not have found a better person to help me than Mia. She is a really patient and kind teacher, overflowing with knowledge and passion when it comes to helping her students. I felt like my future as far as singing was over until I started having classes with her. Some classes were even a bit emotional as she helped me realize that there was hope for me yet. Not only can I sing more easily now, but I can feel myself improving with every new exercise I learn from her. Thanks to her, I can continue my singing journey, and I can't wait to improve even more with her guidance. I feel very lucky to be one of her students. Seriously, thank you so much Mia!",
  },
  {
    name: "Zee",
    message:
      "If you want to learn to sing or want to take your singing to the next level, TAKE MIA'S LESSONS. Seriously, her lessons are all one need to start singing. I made a decision to train my vocals like 3 years ago and have been practicing and doing vocal workouts that I found on YouTube pretty consistently ever since but nothing worked as fast and as good as Mia's lessons. Within a week my tone improved and singing became pretty much effortless for me, now after three months of lessons almost every week and due to her constant guidance I am able to sing in balanced mix and can go up and down my range pretty easily without straining. I've gotten many compliments on my singing ever since I started learning singing from her. The technique she teaches is THE best because before using it, singing used to painful for me. The dedication she puts in teaching each of her students can really be seen and also if you got any singing related issue, she'll provide solutions for that instantly. My vocals keep getting better now and it couldn't have been possible without her. Last but not least, learning is fun and comfortable with her if you're a shy person like me. She teaches and explains depending on how you understand it and depending upon the nature of each student. I could go on but I'd stop it here.",
  },
  {
    name: "Kobuscus",
    message:
      "Well, I’ve been through a lot of vocal coaches, but none has taught me the way Mia did. Things have never been so clear, and the progress with her is great. Mia has really brought back the passion, and hope to get better to my singing journey. I felt stuck, like driving in neutral, because I never understood what do I do, how the voice works, and what are the relations of specific exercises to my voice. Mia has made everything clear, reasonable and coherent. Mia has helped me understand complicated ambiguous vocal techniques that I could never figure out without her. Since we’ve started, I’ve been getting a lot of compliments on my voice, and I feel way more confident in it. Thank you ❤️",
  },
  {
    name: "Bro",
    message:
      "Mia provides really easy and fun exercises that are made that one can assimilate them as effortlessly as possible. Improving my voice (health wise, general understanding of its functions and registers) was way less easy when using random youtube videos without feedback. The one on one lessons, the structured guides and sources she gives and the support of her and her staff have really helped me personally, even in the beginning of my journey to mastering singing and I am very thankful. There are still obstacles, but Mia is always open to helping and giving great tips to get through the rough parts of this adventure. The lessons are always interesting and diverse, and any styles are possible to work through! She is understanding and supportive even when you feel self-conscious. Would 100% recommend working with her. No inconvenience, 10/10.",
  },
  {
    name: "Lebrum",
    message:
      "I came into Mia’s lessons with no prior experience. I was a beginner in every describable way. She helped me improve within a short amount of time, and I’ve seen my voice transform under her guidance. She answered any questions I had regardless of what it was not only during our lessons but on her own time as well. She also was very flexible with her scheduling as I was going through a tough time during the first month of our lessons she understood and allowed me to reschedule multiple times which is something I cannot be more grateful for. You can tell that this is something she is passionate about and loves doing which is the best thing you can ask for from any coach. While she would correct my technique and give me tips she would never be harsh with me and instead gave constructive criticism on every aspect of my voice, and again I cannot be more grateful for everything she has done for me.",
  },
  {
    name: "Alp",
    message:
      "I came into Mia’s lessons with no prior experience. I was a beginner in every describable way. She helped me improve within a short amount of time, and I’ve seen my voice transform under her guidance. She answered any questions I had regardless of what it was not only during our lessons but on her own time as well. She also was very flexible with her scheduling as I was going through a tough time during the first month of our lessons she understood and allowed me to reschedule multiple times which is something I cannot be more grateful for. You can tell that this is something she is passionate about and loves doing which is the best thing you can ask for from any coach. While she would correct my technique and give me tips she would never be harsh with me and instead gave constructive criticism on every aspect of my voice, and again I cannot be more grateful for everything she has done for me.",
  },
  {
    name: "Milla",
    message:
      "With Mia’s approach to teaching, not only was I able to quickly find my mixed voice, and eventually unlock flageolet register, but she has also helped me to learn to sing without pain, use proper breath support, and develop my vocal style. Whatever vocal problem I bring to Mia, she is always dedicated to finding the perfect technique to fix it.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className={`section-block ${styles.section}`}>
      <div className={`container ${styles.container}`}>
        <HeadingPair
          tertiary="Testimonials"
          heading="What my students are saying"
          isCentered
          moreMargin
        />
        <TestimonialList testimonials={testimonials} />
      </div>
    </section>
  );
}
