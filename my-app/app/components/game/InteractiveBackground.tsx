// components/InteractiveBackground.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import StartButton from './StartButton';
import { Platform } from './Platform';
import { Player } from './Player';
import { useGameLoop } from './useGameLoop';
import MobileControls from './MobileControls';
import { getCustomPlatforms, getGoal } from './Platform';

type Goal = {
    x: number;
    y: number;
    width: number;
    height: number;
};

const InteractiveBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const playerRef = useRef<Player>(new Player(50, 50));

    // Replace direct window usage with useState and useEffect
    const [platforms, setPlatforms] = useState<Platform[]>([]);
    const [goal, setGoal] = useState<Goal>({ x: 100, y: 280, width: 10, height: 10 }); //placeholder for type issues
    const [totalHeight, setTotalHeight] = useState<number>(4000); // default height

    // Initialize platforms and goal after mount and on resize
    useEffect(() => {
        // Initial setup function
        const setupGame = () => {
            if (typeof window === 'undefined') return;
            
            const windowWidth = window.innerWidth;
            const pageHeight = Math.max(
                document.documentElement.scrollHeight,
                4000 // minimum height
            );
            
            setTotalHeight(pageHeight);
            setPlatforms(getCustomPlatforms(windowWidth, pageHeight).map(platform => new Platform(platform)));
            setGoal(getGoal(windowWidth, pageHeight));
        };

        // Run initial setup
        setupGame();

        // Add resize listener
        window.addEventListener('resize', setupGame);

        // Cleanup
        return () => {
            window.removeEventListener('resize', setupGame);
        };
    }, []);

    const keysRef = useRef<{ [key: string]: boolean }>({});
    const [started, setStarted] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<number | null>(null);

    // Reset function
    const resetPlayer = () => {
        if (!playerRef.current) return;

        // Clear all key states
        Object.keys(keysRef.current).forEach(key => {
            keysRef.current[key] = false;
        });

        // Reset the start time
        setStartTime(performance.now());

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
        platforms,
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
            resetPlayer();
        },
        totalHeight,
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
            {!started && <StartButton onStart={startGame} />}
            
            <canvas
                ref={canvasRef}
                className="fixed top-0 left-0 w-full h-full -z-10"
                style={{ touchAction: 'none' }}
            />

            {started && (
                <MobileControls
                    onLeftStart={handleLeftTouchStart}
                    onLeftEnd={handleLeftTouchEnd}
                    onRightStart={handleRightTouchStart}
                    onRightEnd={handleRightTouchEnd}
                    onJumpStart={handleJumpTouchStart}
                    onJumpEnd={handleJumpTouchEnd}
                />
            )}
        </div>
    );
};

export default InteractiveBackground;
