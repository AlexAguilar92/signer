/**
 * Construct a type with a set of OPTIONAL properties K of type T
 */
export type PartialRecord<K extends keyof any, T> = {
  // eslint-disable-line
  [P in K]?: T;
};

/**
 * Template-based Object Type
 */
export type ObjectType<T> = { new (): T };
