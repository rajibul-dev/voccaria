import { Essay } from "@/app/_old-components/essay";

export default function RestAboutText({ content }: { content: any[] }) {
  return (
    <Essay className={`mb-[3rem] !gap-[1rem]`}>
      {content.map((para: any, index: number) => {
        return (
          <Essay.Para className="goto-paragraph" key={index}>
            {para}
          </Essay.Para>
        );
      })}
    </Essay>
  );
}
