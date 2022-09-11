/**
 * @interface Repository
 * @template <T, U>
 * @description Generic Repository representation
 */
export default interface Repository<T, U> {
  /**
   * @function execute
   * @param port: T?
   * @returns {Promise<U>}
   * @throws {Exception | Warning}
   * @author Alexandro Aguilar
   * @version 1
   * @description Representing single responsibilioty of each repository
  */
  execute(port?: T): Promise<U>
}