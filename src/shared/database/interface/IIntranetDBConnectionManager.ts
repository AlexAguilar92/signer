import { Connection } from 'typeorm';

/**
 * @interface IIntranetDBConnectionManager
 * @description Database connection helper for legacy database
 * @author Diego Rosas
 * @created 2022-03-30
 * @updated 2022-03-30
 * @updatedBy Diego Rosas
 */
export default interface IIntranetDBConnectionManager {
  connect(): Promise<Connection>;

  disconnect(): Promise<void>;
}
