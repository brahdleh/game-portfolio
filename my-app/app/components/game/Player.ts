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

  update(platforms: Platform[], scale: number) {
    // Apply gravity
    this.velocityY += 0.4 * scale;

    // Terminal velocity
    const maxFallSpeed = 12 * scale;
    if (this.velocityY > maxFallSpeed) {
      this.velocityY = maxFallSpeed;
    }

    // Apply vertical movement
    this.y += this.velocityY;
    this.absoluteY += this.velocityY;
    this.y = this.absoluteY - window.scrollY;
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
          this.y = this.absoluteY - window.scrollY;
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
          this.y = this.absoluteY - window.scrollY;
          this.velocityY = 0;
        }
      }
    }
  }

  jump(scale: number) {
    if (!this.isJumping && this.groundedPlatform) {
      this.velocityY = -16 * scale;
      this.isJumping = true;
    }
  }

  moveLeft(scale: number) {
    this.x -= (window.innerWidth / 300) * scale; // move speed
  }

  moveRight(scale: number) {
    this.x += (window.innerWidth / 300) * scale; // move speed
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

  reset(initialX: number, initialY: number) {
    this.x = initialX;
    this.absoluteY = initialY;
    this.y = this.absoluteY - window.scrollY;
    this.velocityY = 0;
    this.isJumping = false;
    this.groundedPlatform = null;
  }
}
