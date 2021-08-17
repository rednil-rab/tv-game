export function debounce<F extends (...params: any[]) => void>(fn: F, delay: number) {
    let timeoutID: number;
    return function(this: any, ...args: any[]) {
      clearTimeout(timeoutID);
      timeoutID = window.setTimeout(() => fn.apply(this, args), delay);
    } as F;
  }

  export function hideLetters (string: string): string {
    if (string === undefined) {
        return 'string'
    }
    return string.split("").map(char => Math.random() > 0.5 ? "_" : char).join("");
  }