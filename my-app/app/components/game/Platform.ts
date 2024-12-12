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

export const getCustomPlatforms = (windowWidth: number, totalHeight: number): PlatformProps[] => {
  const u = windowWidth / 100;
  const v = totalHeight / 40;
  
  return [
    { x: 2*u, y: 3*v, width: 10*u, height: 4 },
    { x: 5*u, y: 5*v, width: 10*u, height: 4 },
    { x: 2*u, y: 7*v, width: 10*u, height: 4 },
    { x: 2*u, y: 9*v, width: 10*u, height: 4 },
    { x: 5*u, y: 11*v, width: 10*u, height: 4 },
    { x: 2*u, y: 13*v, width: 10*u, height: 4 },
    { x: 2*u, y: 15*v, width: 10*u, height: 4 },
    { x: 5*u, y: 17*v, width: 10*u, height: 4 },
    { x: 2*u, y: 19*v, width: 10*u, height: 4 },
    { x: 2*u, y: 21*v, width: 10*u, height: 4 },
    { x: 5*u, y: 23*v, width: 10*u, height: 4 },
    { x: 2*u, y: 25*v, width: 10*u, height: 4 },
    { x: 2*u, y: 27*v, width: 10*u, height: 4 },
    { x: 5*u, y: 29*v, width: 10*u, height: 4 },
    { x: 5*u, y: 31*v, width: 10*u, height: 4 },
    { x: 4*u, y: 33*v, width: 10*u, height: 4 },
    { x: 3*u, y: 35*v, width: 10*u, height: 4 },
    { x: 2*u, y: 37*v, width: 10*u, height: 4 }, // Bottom
    { x: 25*u, y: 37*v, width: 4*u, height: 4 },
    { x: 40*u, y: 37*v, width: 4*u, height: 4 },
    { x: 60*u, y: 37*v, width: 4*u, height: 4 },
    { x: 75*u, y: 37*v, width: 4*u, height: 4 },
    { x: 84*u, y: 35*v, width: 8*u, height: 4 }, // Right
    { x: 83*u, y: 33*v, width: 10*u, height: 4 },
    { x: 81*u, y: 31*v, width: 14*u, height: 4 },
    { x: 86*u, y: 29*v, width: 6*u, height: 4 },
    { x: 84*u, y: 27*v, width: 12*u, height: 4 },
    { x: 84*u, y: 25*v, width: 5*u, height: 4 },
    { x: 82*u, y: 23*v, width: 12*u, height: 4 },
    { x: 86*u, y: 21*v, width: 2*u, height: 4 },
    { x: 84*u, y: 19*v, width: 7*u, height: 4 },
    { x: 82*u, y: 17*v, width: 15*u, height: 4 },
    { x: 82*u, y: 15*v, width: 10*u, height: 4 },
    { x: 86*u, y: 13*v, width: 2*u, height: 4 },
    { x: 84*u, y: 11*v, width: 2*u, height: 4 },
    { x: 86*u, y: 9*v, width: 2*u, height: 4 },
    { x: 83*u, y: 7*v, width: 13*u, height: 4 },
    { x: 86*u, y: 5*v, width: 5*u, height: 4 },
    { x: 86*u, y: 3*v, width: 5*u, height: 4 },
    ];
};

export const getGoal = (windowWidth: number, totalHeight: number) => {
  const u = windowWidth / 100;
  const v = totalHeight / 40;
  return { x: 89*u, y: 2.8*v, width: u, height: 0.2*v };
};
