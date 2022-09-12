import { QldbDriver, TransactionExecutor } from 'amazon-qldb-driver-nodejs';
import { inject } from 'inversify';
import 'reflect-metadata'
import DBConnectionManager from '../../../../shared/database/DBConnectionManager';
import TYPES from '../../../../types';
import Repository from "../../../common/domain/repository/Repository";
import CompleteDocument from '../entity/CompleteDocument';

export default class SignFindOneRepositoryQuantum implements Repository<string, CompleteDocument> {
  private dBConnectionManagerQuantum: DBConnectionManager<QldbDriver>;

  constructor (
    @inject(TYPES.DBConnectionManager) dBConnectionManagerQuantum: DBConnectionManager<QldbDriver>
  ) {
    this.dBConnectionManagerQuantum = dBConnectionManagerQuantum;
  }
  
  async execute(id?: string): Promise<any> {
    const connection = await this.dBConnectionManagerQuantum.connect();
    try {
      const result = await connection.executeLambda(async (txn: TransactionExecutor) => {
        return await txn.execute('SELECT * FROM _ql_committed_Documents as doc WHERE doc.metadata.id = ?', id);
      });

      return result;
    } catch(error) {
      console.log(error);
      throw error;
    } finally {
      connection.close();
    }
  }
}