declare module 'fast-levenshtein' {
    export function get(a: string, b: string): number;
    export const levenshtein: {
      get: (a: string, b: string) => number;
    };
  }
  