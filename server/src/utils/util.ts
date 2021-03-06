/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

/**
 * Waits for given time
 * @param {number} ms Wait time in milliseconds
 * @returns {Promise<void>}
 */
export const waitFor = (ms: number): Promise<void> => new Promise(res => setTimeout(res, ms));

export function pick<T extends object, U extends keyof T>(obj: T, paths: Array<U>): Pick<T, U> {
  const ret = Object.create(null);

  for (const k of paths) {
    ret[k] = obj[k];
  }

  return ret;
}
