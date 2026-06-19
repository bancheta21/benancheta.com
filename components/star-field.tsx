"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PhotoReveal } from "@/components/photo-reveal";
import { layoutStars, type StarLayout } from "@/lib/stars";

function drawStars(
  ctx: CanvasRenderingContext2D,
  stars: StarLayout[],
  time: number,
  animate: boolean,
  activeIndex: number | null,
) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  stars.forEach((star, index) => {
    const isActive = index === activeIndex;
    const twinkle = animate
      ? 0.55 + 0.45 * (0.5 + 0.5 * Math.sin(time * star.speed + star.phase))
      : 1;
    const opacity = isActive
      ? Math.min(1, star.baseOpacity * twinkle + 0.35)
      : star.baseOpacity * twinkle;
    const radius = isActive ? star.radius * 1.6 : star.radius;

    if (star.glow) {
      ctx.beginPath();
      ctx.fillStyle = `rgba(220, 230, 255, ${opacity * 0.3})`;
      ctx.arc(star.x, star.y, radius * 3.2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.arc(star.x, star.y, radius, 0, Math.PI * 2);
    ctx.fill();
  });
}

export function StarField() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<StarLayout[]>([]);
  const activeIndexRef = useRef<number | null>(null);
  const [stars, setStars] = useState<StarLayout[]>([]);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [revealedIndex, setRevealedIndex] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const hideTimeoutRef = useRef<number | null>(null);

  const cancelHide = useCallback(() => {
    if (hideTimeoutRef.current !== null) {
      window.clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  const setActive = useCallback(
    (index: number | null) => {
      cancelHide();
      setIsClosing(false);
      activeIndexRef.current = index;
      setRevealedIndex(index);
    },
    [cancelHide],
  );

  const beginClose = useCallback(() => {
    cancelHide();
    if (revealedIndex === null) return;
    activeIndexRef.current = null;
    setIsClosing(true);
  }, [cancelHide, revealedIndex]);

  const scheduleHide = useCallback(() => {
    cancelHide();
    hideTimeoutRef.current = window.setTimeout(() => {
      hideTimeoutRef.current = null;
      beginClose();
    }, 200);
  }, [cancelHide, beginClose]);

  const handleCloseComplete = useCallback(() => {
    setIsClosing(false);
    setRevealedIndex(null);
  }, []);

  const preloadPhoto = useCallback((src: string) => {
    const image = new window.Image();
    image.src = src;
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let frameId = 0;
    let start = performance.now();

    const syncLayout = () => {
      const { width, height } = root.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const nextStars = layoutStars(width, height);
      starsRef.current = nextStars;
      setStars(nextStars);
      setViewport({ width, height });
    };

    const animate = (now: number) => {
      const elapsed = (now - start) / 1000;
      drawStars(
        ctx,
        starsRef.current,
        elapsed,
        true,
        activeIndexRef.current,
      );
      frameId = requestAnimationFrame(animate);
    };

    syncLayout();
    drawStars(
      ctx,
      starsRef.current,
      0,
      !reduceMotion,
      activeIndexRef.current,
    );

    if (!reduceMotion) {
      frameId = requestAnimationFrame(animate);
    }

    const onResize = () => {
      syncLayout();
      if (reduceMotion) {
        drawStars(ctx, starsRef.current, 0, false, activeIndexRef.current);
      }
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frameId);
      if (hideTimeoutRef.current !== null) {
        window.clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  const revealedStar =
    revealedIndex === null ? null : stars[revealedIndex] ?? null;

  return (
    <div ref={rootRef} className="star-field">
      <canvas ref={canvasRef} className="star-field-canvas" aria-hidden="true" />

      {stars.map((star, index) => (
        <button
          key={star.photo.id}
          type="button"
          className="star-hit"
          style={{ left: star.x, top: star.y }}
          aria-label={`View ${star.photo.alt}`}
          aria-expanded={revealedIndex === index && !isClosing}
          onMouseEnter={() => {
            preloadPhoto(star.photo.src);
            setActive(index);
          }}
          onMouseLeave={scheduleHide}
          onFocus={() => {
            preloadPhoto(star.photo.src);
            setActive(index);
          }}
        />
      ))}

      {revealedStar && viewport.width > 0 ? (
        <PhotoReveal
          key={revealedStar.photo.id}
          star={revealedStar}
          viewportWidth={viewport.width}
          viewportHeight={viewport.height}
          isClosing={isClosing}
          onCloseComplete={handleCloseComplete}
        />
      ) : null}
    </div>
  );
}
