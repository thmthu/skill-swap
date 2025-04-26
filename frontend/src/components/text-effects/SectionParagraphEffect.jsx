import { TextEffect } from "motion-primitives";

export function SectionParagraphEffect() {
  return (
    <TextEffect
      per="line"
      as="p"
      segmentWrapperClassName="overflow-hidden block"
      variants={{
        container: {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        },
        item: {
          hidden: { opacity: 0, y: 40 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 },
          },
        },
      }}
    >
      {`Learn smarter.
Teach faster.
Grow together.`}
    </TextEffect>
  );
}
