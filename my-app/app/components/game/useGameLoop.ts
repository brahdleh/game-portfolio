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
    goal: { x: number, y: number, width: number, height: number };
    onGoalReached: () => void;
    totalHeight: number;
}

export const useGameLoop = ({
    canvasRef,
    player,
    platforms,
    keys,
    onReset,
    started,
    goal,
    onGoalReached,
    totalHeight
}: UseGameLoopProps) => {
    const animationFrameId = useRef<number>();
    

    useEffect(() => {
        // Guard for SSR
        if (typeof window === 'undefined') return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const devicePixelRatio = window.devicePixelRatio || 1;

        const setCanvasSize = () => {
            const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 800;
            const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 600;

            canvas.width = windowWidth * devicePixelRatio;
            canvas.height = windowHeight * devicePixelRatio;
            canvas.style.width = `${windowWidth}px`;
            canvas.style.height = `${windowHeight}px`;
            ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
        };

        // Set initial canvas size
        setCanvasSize();

        // Update canvas size on resize
        const handleResize = () => setCanvasSize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [canvasRef]);

    useEffect(() => {
        // Do not start the loop if not started
        if (!started) return;

        // Guard for SSR
        if (typeof window === 'undefined') return;

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx || !canvas) return;

        const gameLoop = () => {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const currentScrollY = window.scrollY;

            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const scale = 1; // scale factor

            // Handle input
            if (keys['a'] || keys['ArrowLeft']) {
                player.moveLeft(scale, windowWidth);
            }
            if (keys['d'] || keys['ArrowRight']) {
                player.moveRight(scale, windowWidth);
            }
            if (keys[' ']) {
                player.jump(scale, totalHeight);
            }

            // Update the player
            player.update(platforms, scale, currentScrollY, windowWidth, totalHeight);

            // Center-focused scrolling
            const idealScrollY = player.absoluteY - windowHeight / 2;
            const minScroll = 0;
            const maxScroll = totalHeight - windowHeight;
            const targetScrollY = Math.max(minScroll, Math.min(maxScroll, idealScrollY));

            window.scrollTo({
                top: targetScrollY,
                behavior: 'auto',
            });

            // Check if player is out of bounds
            if (
                player.absoluteY > totalHeight ||
                player.x < -10 ||
                player.x + player.width > 10 + windowWidth
            ) {
                onReset();
            }

            // Draw player
            player.draw(ctx, scale);

            // Draw platforms
            for (const platform of platforms) {
                platform.draw(ctx, currentScrollY, scale);
            }

            // Draw goal
            ctx.fillStyle = 'gold';
            const goalScreenY = goal.y - currentScrollY;
            ctx.fillRect(goal.x * scale, goalScreenY * scale, goal.width * scale, goal.height * scale);

            // Check if player reached goal
            if (
                player.x < goal.x + goal.width &&
                player.x + player.width > goal.x &&
                player.absoluteY < goal.y + goal.height &&
                player.absoluteY + player.height > goal.y
            ) {
                onGoalReached();
                onReset();
            }

            // Continue the loop
            animationFrameId.current = requestAnimationFrame(gameLoop);
        };

        // Start the loop
        animationFrameId.current = requestAnimationFrame(gameLoop);

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [started, canvasRef, player, platforms, keys, onReset, goal, onGoalReached, totalHeight]);

    return null;
};
