"use client";

import confetti from "canvas-confetti";

export function triggerConfetti() {
  const duration = 3000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ["#6366f1", "#8b5cf6", "#3b82f6"],
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ["#6366f1", "#8b5cf6", "#3b82f6"],
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}
