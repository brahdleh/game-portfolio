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

    /**
     * Update the player's position and velocity based on gravity, collisions, and scroll offset.
     * @param platforms - Array of platforms for collision detection.
     * @param scale - The game's current scale factor.
     * @param scrollY - Current vertical scroll position of the viewport.
     * @param windowWidth - Current width of the viewport.
     * @param windowHeight - Current height of the viewport.
     */
    update(
        platforms: Platform[],
        scale: number,
        scrollY: number,
    ) {
        // Apply gravity
        this.velocityY += 0.4 * scale;

        // Add window height and width to update function if required

        // Terminal velocity
        const maxFallSpeed = 18 * scale;
        if (this.velocityY > maxFallSpeed) {
            this.velocityY = maxFallSpeed;
        }

        // Apply vertical movement
        this.y += this.velocityY;
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

    /**
     * Attempt a jump if player is grounded.
     * @param scale - Game scale factor.
     */
    jump(scale: number) {
        if (!this.isJumping && this.groundedPlatform) {
            this.velocityY = -14 * scale;
            this.isJumping = true;
        }
    }

    /**
     * Move the player to the left.
     * @param scale - Game scale factor.
     * @param windowWidth - Current width of the viewport.
     */
    moveLeft(scale: number, windowWidth: number) {
        const moveSpeed = (windowWidth / 400) * scale;
        this.x -= moveSpeed;
        if (this.x < 0) {
            this.x = 0;
        }
    }

    /**
     * Move the player to the right.
     * @param scale - Game scale factor.
     * @param windowWidth - Current width of the viewport.
     */
    moveRight(scale: number, windowWidth: number) {
        const moveSpeed = (windowWidth / 400) * scale;
        this.x += moveSpeed;
        if (this.x + this.width > windowWidth) {
            this.x = windowWidth - this.width;
        }
    }

    /**
     * Draw the player on the canvas.
     * @param ctx - Canvas rendering context.
     * @param scale - Game scale factor.
     */
    draw(ctx: CanvasRenderingContext2D, scale: number) {
        ctx.fillStyle = 'red';
        ctx.fillRect(
            this.x * scale,
            this.y * scale,
            this.width * scale,
            this.height * scale
        );
    }

    /**
     * Reset the player's position and state.
     * @param initialX - Initial X position.
     * @param initialY - Initial Y position.
     * @param scrollY - Current vertical scroll offset.
     */
    reset(initialX: number, initialY: number, scrollY: number) {
        this.x = initialX;
        this.absoluteY = initialY;
        this.y = this.absoluteY - scrollY;
        this.velocityY = 0;
        this.isJumping = false;
        this.groundedPlatform = null;
    }
}
