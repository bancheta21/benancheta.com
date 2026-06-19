"use client";

import { useEffect, useState } from "react";

const QUOTES = [
  "If you take all the money and distribute it evenly amongst everyone in the country, in the end, the rich will again be rich, and the poor will again be poor",
  "I genuinely prefer to be the guy in the ring that gets knocked out and booed by the crowd than to be one of them",
  "The sun will set soon. Isn't your child afraid? Of course she's not afraid. She knows that the sun will rise again tomorrow.",
  "What if this life is the paradise we were promised, and we're just squandering it?",
  "The only way to actually get peace on the inside is to give up this idea of problems.",
  "When working, surround yourself with people more successful than you. When playing, surround yourself with people happier than you.",
  "When you find the 1 percent of your discipline which will not be wasted, which you'll be able to invest in for the rest of your life and has meaning to you – go all in and forget the rest.",
  "When you find the right thing to do, when you find the right people to work with, invest deeply. Sticking with it for decades is really how you make the big returns in your relationships and in your money. So, compound interest is very important.",
  "Any moment where you're not having a great time, when you're not really happy, you're not doing anyone any favors. It's not like your unhappiness makes them better off somehow. All you're doing is wasting this incredibly small and precious time you have on this Earth.",
  "You're going to die one day, and none of this is going to matter. So enjoy yourself. Do something positive. Project some love. Make someone happy. Laugh a little bit. Appreciate the moment. And do your work.",
  "I never want to be in an environment or around people where I have to watch what I say. Anyone around whom I can't be fully honest, I don't want to be around.",
  "I only want to be around people I know I'm going to be around for the rest of my life.",
  "Here lies Epictetus, a slave maimed in body, the ultimate in poverty, and favored by the gods.",
  "Until death, all defeat is psychological.",
  "If you make the easy choices right now, your overall life will be a lot harder.",
  "Most of our suffering comes from avoidance.",
  "When you really want to change, you just change. But most of us don't really want to change – we don't want to go through the pain just yet. Recognize it, be aware of it, and give yourself a smaller change you can actually carry out.",
  "You're dying and being reborn at every moment. It's up to you whether to forget or remember that.",
  "Everything is more beautiful because we're doomed. You will never be lovelier than you are now, and we will never be here again.",
  "Reading science, math, and philosophy one hour per day will likely put you at the upper echelon of human success within seven years.",
  "The goal is not to win big each time. The goal is not to miss the opportunity to win big once.",
];

function shuffle<T>(items: T[]) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const FIXED_REPEATS = 720;

function buildTextBlock(quotes: string[], shouldShuffle: boolean) {
  const ordered = shouldShuffle ? shuffle(quotes) : quotes;
  const stream = ordered.join(" ").replace(/\s+/g, " ") + " ";
  return stream.repeat(FIXED_REPEATS).replace(/\s+/g, " ").trim();
}

export function TextMaskHero() {
  const [text, setText] = useState(() => buildTextBlock(QUOTES, false));

  useEffect(() => {
    setText(buildTextBlock(QUOTES, true));
  }, []);

  return (
    <section className="text-mask-hero">
      <div className="quote-compose">{text}</div>
    </section>
  );
}
