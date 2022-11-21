interface Clamp {
  (x: number, min: number, max: number) : number
}

export const clamp: Clamp = (
  x, min, max,
) => Math.min(Math.max(x, min), max);
