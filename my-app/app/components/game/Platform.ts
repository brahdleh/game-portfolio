// components/game/Platform.ts

export interface PlatformProps {
    x: number;
    y: number;
    width: number;
    height: number;
  }
  
  export class Platform {
    x: number;
    y: number;
    width: number;
    height: number;
  
    constructor({ x, y, width, height }: PlatformProps) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }
  
    draw(ctx: CanvasRenderingContext2D, scrollY: number, scale: number) {
      ctx.fillStyle = 'black';
      ctx.fillRect(
        this.x * scale,
        (this.y - scrollY) * scale,
        this.width * scale,
        this.height * scale
      );
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2 * scale;
      ctx.strokeRect(
        this.x * scale,
        (this.y - scrollY) * scale,
        this.width * scale,
        this.height * scale
      );
    }
  }
  