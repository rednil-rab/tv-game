import { toNumber, isNaN } from 'lodash';

export function debounce<F extends (...params: any[]) => void>(fn: F, delay: number) {
  let timeoutID: number;
  return function(this: any, ...args: any[]) {
    clearTimeout(timeoutID);
    timeoutID = window.setTimeout(() => fn.apply(this, args), delay);
  } as F;
}

export function hideLetters (str: string): string {
  if (str === undefined) {
    return '';
  }
  return str.split('').map(char => Math.random() > 0.5 ? '_' : char).join('');
}

export const setToLocalStorage = (name: string, number: number ) => localStorage.setItem(name, JSON.stringify(number));

export const getFromLocalStorage = (name: string) => {
  const numberFromLocalStorage = toNumber(localStorage.getItem(name));
  if (isNaN(numberFromLocalStorage)) return 0;
  return numberFromLocalStorage;
};