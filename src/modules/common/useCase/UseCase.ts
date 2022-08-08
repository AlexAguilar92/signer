export default interface UseCase<T, U> {

  /**
   * @function execute
   * @param {T} port
   * @returns {Promise<U>}
   * @template T, U
   * @description UseCase interface
   * @author Alexandro Aguilar
   * @created 2022-08-05
   * @updated 2022-08-05
   * @updatedBy Alexandro Aguilar
   */
  port(port: T): Promise<U>
}