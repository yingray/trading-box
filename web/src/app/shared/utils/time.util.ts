import Big from 'big.js';

export const getDateForZeroSecOfMin = (date: Date): Date => {
  if (!date) {
    return new Date(new Date().setSeconds(0, 0));
  }
  return new Date(date.setSeconds(0, 0));
};

export const getTimeToSec = (date: Date): number => {
  return Big(date.getTime()).div(1000).toNumber();
};
