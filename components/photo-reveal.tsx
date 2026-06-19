"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  cardPosition,
  mediaDisplaySize,
  type StarLayout,
} from "@/lib/stars";

type PhotoRevealProps = {
  star: StarLayout;
  viewportWidth: number;
  viewportHeight: number;
  isClosing: boolean;
  onCloseComplete: () => void;
};

export function PhotoReveal({
  star,
  viewportWidth,
  viewportHeight,
  isClosing,
  onCloseComplete,
}: PhotoRevealProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [displaySize, setDisplaySize] = useState(() =>
    mediaDisplaySize(star.photo.width, star.photo.height),
  );

  const { left, top } = cardPosition(
    star.x,
    star.y,
    viewportWidth,
    viewportHeight,
    displaySize.width,
    displaySize.height,
  );

  useEffect(() => {
    setDisplaySize(mediaDisplaySize(star.photo.width, star.photo.height));
  }, [star.photo.width, star.photo.height]);

  useEffect(() => {
    if (!isClosing) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      onCloseComplete();
      return;
    }

    const card = cardRef.current;
    if (!card) return;

    const onAnimationEnd = (event: AnimationEvent) => {
      if (event.animationName === "photo-reveal-out") {
        onCloseComplete();
      }
    };

    card.addEventListener("animationend", onAnimationEnd);
    return () => card.removeEventListener("animationend", onAnimationEnd);
  }, [isClosing, onCloseComplete]);

  return (
    <div
      ref={cardRef}
      className={`photo-reveal${isClosing ? " photo-reveal--closing" : ""}`}
      style={{
        left,
        top,
        width: displaySize.width,
        height: displaySize.height,
        ["--star-x" as string]: `${star.x - left}px`,
        ["--star-y" as string]: `${star.y - top}px`,
      }}
    >
      <Image
          src={star.photo.src}
          alt={star.photo.alt}
          width={displaySize.width}
          height={displaySize.height}
          sizes={`${displaySize.width}px`}
          className="photo-reveal-image"
          priority
          onLoad={(event) => {
            const { naturalWidth, naturalHeight } = event.currentTarget;
            const nextSize = mediaDisplaySize(naturalWidth, naturalHeight);
            setDisplaySize((current) =>
              current.width === nextSize.width && current.height === nextSize.height
                ? current
                : nextSize,
            );
          }}
      />
    </div>
  );
}
