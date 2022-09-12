/**
 * @interface DBConnectionManager
 * @description Abstracts connections from ORMS or any other connection tool.
 * @template <T> Connection type or driver.
 * @author Alexandro Aguilar
 * @created 2020-03-13
 * @updated 2020-03-13
 * @updatedBy Alexandro Aguilar
 */

export default interface DBConnectionManager<T> {
  disconnect(): Promise<void>;
  // endTransaction(): Promise<void>;
  connect(): Promise<T>;
  // getTransaction(): Promise<QueryRunner>;
  // getActiveConnection(): Promise<DataSource | QueryRunner>;
}