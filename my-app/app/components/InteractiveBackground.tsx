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

    // Safely access window for dimensions
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 800;
    const u = windowWidth / 100;

    const customPlatforms: PlatformProps[] = [
        { x: 2*u, y: 300, width: 10*u, height: 4 },
        { x: 5*u, y: 500, width: 10*u, height: 4 },
        { x: 2*u, y: 700, width: 10*u, height: 4 },
        { x: 2*u, y: 900, width: 10*u, height: 4 },
        { x: 5*u, y: 1100, width: 10*u, height: 4 },
        { x: 2*u, y: 1300, width: 10*u, height: 4 },
        { x: 2*u, y: 1500, width: 10*u, height: 4 },
        { x: 5*u, y: 1700, width: 10*u, height: 4 },
        { x: 2*u, y: 1900, width: 10*u, height: 4 },
        { x: 2*u, y: 2100, width: 10*u, height: 4 },
        { x: 5*u, y: 2300, width: 10*u, height: 4 },
        { x: 2*u, y: 2500, width: 10*u, height: 4 },
        { x: 2*u, y: 2700, width: 10*u, height: 4 },
        { x: 5*u, y: 2900, width: 10*u, height: 4 },
        { x: 5*u, y: 3100, width: 10*u, height: 4 },
        { x: 4*u, y: 3300, width: 10*u, height: 4 },
        { x: 3*u, y: 3500, width: 10*u, height: 4 },
        { x: 2*u, y: 3700, width: 10*u, height: 4 }, // Bottom
        { x: 25*u, y: 3700, width: 4*u, height: 4 },
        { x: 40*u, y: 3700, width: 4*u, height: 4 },
        { x: 60*u, y: 3700, width: 4*u, height: 4 },
        { x: 75*u, y: 3700, width: 4*u, height: 4 },
        { x: 84*u, y: 3500, width: 8*u, height: 4 }, // Right
        { x: 83*u, y: 3300, width: 10*u, height: 4 },
        { x: 81*u, y: 3100, width: 14*u, height: 4 },
        { x: 86*u, y: 2900, width: 6*u, height: 4 },
        { x: 84*u, y: 2700, width: 12*u, height: 4 },
        { x: 84*u, y: 2500, width: 5*u, height: 4 },
        { x: 82*u, y: 2300, width: 12*u, height: 4 },
        { x: 86*u, y: 2100, width: 2*u, height: 4 },
        { x: 84*u, y: 1900, width: 7*u, height: 4 },
        { x: 82*u, y: 1700, width: 15*u, height: 4 },
        { x: 82*u, y: 1500, width: 10*u, height: 4 },
        { x: 86*u, y: 1300, width: 2*u, height: 4 },
        { x: 84*u, y: 1100, width: 2*u, height: 4 },
        { x: 86*u, y: 900, width: 2*u, height: 4 },
        { x: 83*u, y: 700, width: 13*u, height: 4 },
        { x: 86*u, y: 500, width: 5*u, height: 4 },
        { x: 86*u, y: 300, width: 5*u, height: 4 },
        ];

    // A goal placed after the final platform
    // For example, put it slightly to the right of the last platform
    const goal = { x: 89*u, y: 280, width: 10, height: 10 };

    // Initialize platformsRef
    const platformsRef = useRef<Platform[]>(customPlatforms.map(platform => new Platform(platform)));

    const keysRef = useRef<{ [key: string]: boolean }>({});
    const [started, setStarted] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<number | null>(null);

    // Reset function
    const resetPlayer = () => {
        if (!playerRef.current) return;

        const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
        playerRef.current.reset(0.03*window.innerWidth, 50, scrollY);

        if (typeof window !== 'undefined') {
            window.scrollTo({
                top: playerRef.current.absoluteY - (window.innerHeight / 2),
                behavior: 'auto',
            });
        }
    };

    // Handle game loop, now pass the goal and a callback for when goal reached
    useGameLoop({
        canvasRef,
        player: playerRef.current,
        platforms: platformsRef.current,
        keys: keysRef.current,
        onReset: resetPlayer,
        started,
        goal,
        onGoalReached: () => {
            if (startTime !== null) {
                const endTime = performance.now();
                const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
                alert(`Congratulations! You reached the goal in ${timeTaken} seconds.`);
            }
        }
    });

    // Handle keyboard input (client-side only)
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleKeyDown = (e: KeyboardEvent) => {
            keysRef.current[e.key] = true;
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            keysRef.current[e.key] = false;
        };

        // Prevent space and arrow keys from scrolling
        const preventDefault = (e: KeyboardEvent) => {
            if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
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
        setStartTime(performance.now());
        setStarted(true);
    };

    // Touch handlers for mobile controls
    const handleLeftTouchStart = () => {
        keysRef.current['a'] = true;
    };
    const handleLeftTouchEnd = () => {
        keysRef.current['a'] = false;
    };

    const handleRightTouchStart = () => {
        keysRef.current['d'] = true;
    };
    const handleRightTouchEnd = () => {
        keysRef.current['d'] = false;
    };

    const handleJumpTouchStart = () => {
        keysRef.current[' '] = true;
    };
    const handleJumpTouchEnd = () => {
        keysRef.current[' '] = false;
    };

    return (
        <div>
            {/* Show Start Button if not started */}
            {!started && <StartButton onStart={startGame} />}

            {/* Canvas Element */}
            <canvas
                ref={canvasRef}
                className="fixed top-0 left-0 w-full h-full -z-10"
                style={{
                    touchAction: 'none',
                }}
            />

            {/* Mobile controls overlay */}
            {started && (
                <div style={{ position: 'fixed', bottom: '10px', width: '100%', display: 'flex', justifyContent: 'start', zIndex: 10, padding: '0 20px' }}>
                    {/* Left button */}
                    <div
                        onTouchStart={handleLeftTouchStart}
                        onTouchEnd={handleLeftTouchEnd}
                        style={{
                            width: '60px',
                            height: '60px',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            userSelect: 'none'
                        }}
                    >
                        ←
                    </div>

                    {/* Right button */}
                    <div
                        onTouchStart={handleRightTouchStart}
                        onTouchEnd={handleRightTouchEnd}
                        style={{
                            width: '60px',
                            height: '60px',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            userSelect: 'none'
                        }}
                    >
                        →
                    </div>

                    {/* Jump button in the center */}
                    <div
                        onTouchStart={handleJumpTouchStart}
                        onTouchEnd={handleJumpTouchEnd}
                        style={{
                            width: '60px',
                            height: '60px',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            userSelect: 'none'
                        }}
                    >
                        ↑
                    </div>
                </div>
            )}
        </div>
    );
};

export default InteractiveBackground;
