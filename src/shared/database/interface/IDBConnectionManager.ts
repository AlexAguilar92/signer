import { DataSource, QueryRunner } from 'typeorm';

/**
 * @interface DBConnectionHelper
 * @description Database connection helper
 * @author Alexandro Aguilar
 * @created 2020-03-13
 * @updated 2020-03-13
 * @updatedBy Alexandro Aguilar
 */
export default interface IDBConnectionManager {
  disconnect(): Promise<void>;
  endTransaction(): Promise<void>;
  getConnection(): Promise<DataSource>;
  getTransaction(): Promise<QueryRunner>;
  getActiveConnection(): Promise<DataSource | QueryRunner>;
}
