// components/game/useGameLoop.ts

import { useRef, useEffect } from 'react';
import { Player } from './Player';
import { Platform } from './Platform';

interface UseGameLoopProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  player: Player;
  platforms: Platform[];
  keys: { [key: string]: boolean };
  onReset: () => void;
  started: boolean;
}

export const useGameLoop = ({
  canvasRef,
  player,
  platforms,
  keys,
  onReset,
  started,
}: UseGameLoopProps) => {
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const devicePixelRatio = window.devicePixelRatio || 1;

    // Function to set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };

    // Initial canvas size
    setCanvasSize();

    // Update canvas size on resize
    window.addEventListener('resize', setCanvasSize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [canvasRef, devicePixelRatio]);

  useEffect(() => {
    if (!started) return; // Do not start the game loop if not started

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const totalHeight = window.document.body.offsetHeight;

    const gameLoop = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scale = 1; // Adjust scale if necessary

      // Handle input
      if (keys['a'] || keys['ArrowLeft']) {
        player.moveLeft(scale);
      }
      if (keys['d'] || keys['ArrowRight']) {
        player.moveRight(scale);
      }
      if (keys[' ']) {
        player.jump(scale);
      }

      // Update player
      player.update(platforms, scale);

      // Center-focused scrolling using absolute position
      const idealScrollY = player.absoluteY - window.innerHeight / 2;
      const minScroll = 0;
      const maxScroll = totalHeight - window.innerHeight;
      const targetScrollY = Math.max(minScroll, Math.min(maxScroll, idealScrollY));

      window.scrollTo({
        top: targetScrollY,
        behavior: 'auto',
      });

      // Check if player is out of bounds, with buffer, shouldn't be possible anyway
      if (
        player.absoluteY > totalHeight ||
        player.x < -10 ||
        player.x + player.width > 10 + window.innerWidth
      ) {
        onReset();
      }

      // Draw player
      player.draw(ctx, scale);

      // Draw platforms
      const currentScrollY = window.scrollY;
      for (const platform of platforms) {
        platform.draw(ctx, currentScrollY, scale);
      }

      // Continue the loop
      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    // Start the game loop
    animationFrameId.current = requestAnimationFrame(gameLoop);

    // Cleanup when 'started' changes or component unmounts
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [started, canvasRef, player, platforms, keys, onReset]);
};
