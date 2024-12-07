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

  export const getCustomPlatforms = (windowWidth: number): PlatformProps[] => {
    const u = windowWidth / 100;
    return [
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
  };
  
  export const getGoal = (windowWidth: number) => {
    const u = windowWidth / 100;
    return { x: 89*u, y: 280, width: 10, height: 10 };
  };
  