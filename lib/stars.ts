import { PHOTOS, type Photo } from "@/lib/photos";

export type StarLayout = {
  x: number;
  y: number;
  radius: number;
  baseOpacity: number;
  phase: number;
  speed: number;
  glow: boolean;
  photo: Photo;
};

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

export function layoutStars(width: number, height: number): StarLayout[] {
  const skyTop = height * 0.05;
  const skyBottom = height * 0.46;
  const marginX = width * 0.08;

  return PHOTOS.map((photo) => {
    const seed = hashString(photo.id);
    const x =
      marginX + ((seed % 10_000) / 10_000) * (width - marginX * 2);
    const y =
      skyTop + ((seed >> 8) % 10_000) / 10_000 * (skyBottom - skyTop);

    return {
      x,
      y,
      radius: 0.55 + ((seed >> 16) % 100) / 100,
      baseOpacity: 0.55 + ((seed >> 12) % 100) / 250,
      phase: ((seed >> 4) % 628) / 100,
      speed: 0.004 + ((seed >> 20) % 100) / 10_000,
      glow: (seed >> 24) % 5 === 0,
      photo,
    };
  });
}

export function cardPosition(
  starX: number,
  starY: number,
  viewportWidth: number,
  viewportHeight: number,
  cardWidth: number,
  cardHeight: number,
) {
  const padding = 20;
  let left = starX - cardWidth / 2;
  let top = starY - cardHeight / 2;

  if (left < padding) left = padding;
  if (left + cardWidth > viewportWidth - padding) {
    left = viewportWidth - cardWidth - padding;
  }
  if (top < padding) top = padding;
  if (top + cardHeight > viewportHeight - padding) {
    top = viewportHeight - cardHeight - padding;
  }

  return { left, top };
}

export const MEDIA_MAX_WIDTH = 420;
export const MEDIA_MAX_HEIGHT = 340;

export function mediaDisplaySize(intrinsicWidth: number, intrinsicHeight: number) {
  const ratio = intrinsicWidth / intrinsicHeight;
  let width = MEDIA_MAX_WIDTH;
  let height = width / ratio;

  if (height > MEDIA_MAX_HEIGHT) {
    height = MEDIA_MAX_HEIGHT;
    width = height * ratio;
  }

  return {
    width: Math.round(width),
    height: Math.round(height),
  };
}
