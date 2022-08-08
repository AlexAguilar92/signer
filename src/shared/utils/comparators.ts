/**
 * @name stringCompCaseInsensitive
 * @description Checks if two strings are equal case insensitive
 * @param {string} stringA
 * @param {string} stringB
 * @returns {boolean}
 */
export const stringCompCaseInsensitive = (stringA: any, stringB: any): boolean => {
  return typeof stringA === 'string' && typeof stringB === 'string'
    ? stringA.localeCompare(stringB, undefined, { sensitivity: 'accent' }) === 0
    : stringA === stringB;
};

/**
 * @name duplicatedIdInArrayComp
 * @description Checks if Array Ids contain duplicated Ids
 * @param {Array} arrayA
 * @param {Array} arrayB
 * @returns {boolean}
 */
export const duplicatedIdInArrayComp = (arrayA: string[]): boolean => {
  return arrayA.length === Array.from(new Set(arrayA)).length;
};
