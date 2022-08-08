/**
 * @name isPositiveNumber
 * @description Checks if a string could be parsed to a positive number
 * @param {string} text
 * @returns {boolean}
 * @author Diego Rosas
 * @created 11-03-22
 * @modified 11-03-22
 */

const isPositiveNumber = (text: string): boolean => {
  return +text > 0;
};

/**
 * @name ceilDecimal
 * @description Ceil a number to a certain number of decimals
 * @param {number} number
 * @param {number} decimals
 * @returns {number}
 * @author Diego Rosas
 * @created 11-03-22
 * @modified 11-03-22
 */

const ceilDecimal = (number: number, decimals: number): number => {
  return Number(number.toFixed(decimals));
};

export { isPositiveNumber, ceilDecimal };
