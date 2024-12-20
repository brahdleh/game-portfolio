// components/game/Player.ts
import { Platform } from './Platform';

export class Player {
    x: number;
    y: number;
    width: number;
    height: number;
    velocityY: number;
    isJumping: boolean;
    groundedPlatform: Platform | null;
    absoluteY: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 40;
        this.velocityY = 0;
        this.isJumping = false;
        this.groundedPlatform = null;
        this.absoluteY = y;
    }

    update(
        platforms: Platform[],
        scale: number,
        scrollY: number,
        windowWidth: number,
        totalHeight: number,
    ) {
        // Scale player dimensions
        this.width = windowWidth / 80;
        this.height = totalHeight / 100;

        // Scale gravity and terminal velocity with total height
        const heightScale = totalHeight / 4000; // baseline height of 4000px
        
        // Apply gravity (scaled)
        this.velocityY += 0.5 * scale * heightScale;

        // Terminal velocity (scaled)
        const maxFallSpeed = 20 * scale * heightScale;
        if (this.velocityY > maxFallSpeed) {
            this.velocityY = maxFallSpeed;
        }

        // Apply vertical movement
        this.absoluteY += this.velocityY;

        // Adjust to viewport scroll
        this.y = this.absoluteY - scrollY;
        this.groundedPlatform = null;

        // Check for collision with platforms
        for (const platform of platforms) {
            if (
                this.x < platform.x + platform.width &&
                this.x + this.width > platform.x &&
                this.absoluteY < platform.y + platform.height &&
                this.absoluteY + this.height > platform.y
            ) {
                // Collision from above
                if (
                    this.velocityY > 0 &&
                    this.absoluteY + this.height - this.velocityY <= platform.y
                ) {
                    this.absoluteY = platform.y - this.height;
                    this.y = this.absoluteY - scrollY;
                    this.velocityY = 0;
                    this.isJumping = false;
                    this.groundedPlatform = platform;
                }
                // Collision from below
                else if (
                    this.velocityY < 0 &&
                    this.absoluteY - this.velocityY >= platform.y + platform.height
                ) {
                    this.absoluteY = platform.y + platform.height;
                    this.y = this.absoluteY - scrollY;
                    this.velocityY = 0;
                }
            }
        }
    }

    jump(scale: number, totalHeight: number) {
        if (!this.isJumping && this.groundedPlatform) {
            const heightScale = totalHeight / 4000;
            this.velocityY = -15 * scale * heightScale;
            this.isJumping = true;
        }
    }

    moveLeft(scale: number, windowWidth: number) {
        const moveSpeed = (windowWidth / 350) * scale;
        this.x -= moveSpeed;
        if (this.x < 0) {
            this.x = 0;
        }
    }

    moveRight(scale: number, windowWidth: number) {
        const moveSpeed = (windowWidth / 350) * scale;
        this.x += moveSpeed;
        if (this.x + this.width > windowWidth) {
            this.x = windowWidth - this.width;
        }
    }

    draw(ctx: CanvasRenderingContext2D, scale: number) {
        ctx.fillStyle = 'red';
        ctx.fillRect(
            this.x * scale,
            this.y * scale,
            this.width * scale,
            this.height * scale
        );
    }

    reset(initialX: number, initialY: number, scrollY: number) {
        this.x = initialX;
        this.absoluteY = initialY;
        this.y = this.absoluteY - scrollY;
        this.velocityY = 0;
        this.isJumping = false;
        this.groundedPlatform = null;
    }
}