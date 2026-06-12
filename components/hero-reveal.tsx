"use client";

import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";

export default function HeroReveal({
  text,
  highlight,
}: {
  text: string;
  highlight?: string;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  return (
    <LazyMotion features={domAnimation}>
      <h1
        className="max-w-3xl text-balance font-medium leading-[1.1]"
        style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)" }}
      >
        {words.map((word, i) => (
          <m.span
            key={`${word}-${i}`}
            className="inline-block"
            initial={reduce ? false : { opacity: 0, y: "0.4em" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {highlight && word.startsWith(highlight) ? (
              <span className="text-accent">{word}</span>
            ) : (
              word
            )}
            {i < words.length - 1 ? " " : ""}
          </m.span>
        ))}
      </h1>
    </LazyMotion>
  );
}
