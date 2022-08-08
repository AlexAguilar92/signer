export default interface Adapter<T, U> {

  /**
   * @function execute
   * @param {T} port
   * @returns {Promise<U>}
   * @template T, U
   * @description Adapter interface
   * @author Alexandro Aguilar
   * @created 2022-06-27
   * @updated 2022-06-27
   * @updatedBy Alexandro Aguilar
   */
  execute(port: T): Promise<U>
}