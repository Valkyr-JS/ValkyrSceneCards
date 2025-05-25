/** Returns the greatest common denominator of two given numbers. */
export const gcd = function (a: number, b: number): number {
  return !b ? a : gcd(b, a % b);
};
