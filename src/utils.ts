import { toNumber, isNaN } from 'lodash';

export function hideLetters (str: string): string {
  if (str === undefined) {
    return '';
  }
  return str.split('').map(char => Math.random() > 0.5 ? '_' : char).join('');
}

export const setToLocalStorage = (name: string, number: number ): void => localStorage.setItem(name, JSON.stringify(number));

export const getFromLocalStorage = (name: string): number => {
  const numberFromLocalStorage = toNumber(localStorage.getItem(name));
  if (isNaN(numberFromLocalStorage)) return 0;
  return numberFromLocalStorage;
};