// components/InteractiveBackground.tsx

'use client';

import React, { useEffect, useRef, useState } from 'react';
import StartButton from './StartButton';
import { Platform, PlatformProps } from './game/Platform';
import { Player } from './game/Player';
import { useGameLoop } from './game/useGameLoop';

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize playerRef with a new Player instance
  const playerRef = useRef<Player>(new Player(50, 50));

  // Define custom platform positions here
  const u = window.innerWidth/100
  const customPlatforms: PlatformProps[] = [
    { x: 2*u, y: 300, width: 10*u, height: 4 },
    { x: 5*u, y: 500, width: 10*u, height: 4 },
    { x: 2*u, y: 700, width: 10*u, height: 4 },
    // Add more platforms as needed to create your course
  ];

  // Initialize platformsRef with custom platforms
  const platformsRef = useRef<Platform[]>(customPlatforms.map(platform => new Platform(platform)));

  const keysRef = useRef<{ [key: string]: boolean }>({});
  const [started, setStarted] = useState<boolean>(false);

  // Reset function
  const resetPlayer = () => {
    if (!playerRef.current) return;

    playerRef.current.reset(50, 50);
    window.scrollTo({
      top: playerRef.current.absoluteY - window.innerHeight / 2,
      behavior: 'auto',
    });
  };

  // Use the custom game loop hook
  useGameLoop({
    canvasRef,
    player: playerRef.current, // Now playerRef.current is initialized
    platforms: platformsRef.current,
    keys: keysRef.current,
    onReset: resetPlayer,
    started, // Pass the started state to control the game loop
  });

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false;
    };

    // Prevent space and arrow keys from scrolling
    const preventDefault = (e: KeyboardEvent) => {
      if (
        ['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(
          e.code
        )
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('keydown', preventDefault);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('keydown', preventDefault);
    };
  }, []);

  // Start the game
  const startGame = () => {
    resetPlayer();
    setStarted(true);
  };

  return (
    <div>
      {/* Start Button */}
      {!started && <StartButton onStart={startGame} />}

      {/* Canvas Element */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-10"
        style={{
          touchAction: 'none',
        }}
      />
    </div>
  );
};

export default InteractiveBackground;
