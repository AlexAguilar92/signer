import 'reflect-metadata'
import TYPES from '../../../../types';
import Document from '../entity/Document';
import { inject, injectable } from 'inversify';
import DocumentData from '../entity/DocumentData';
import Metadata from '../../../common/domain/entity/Metadata';
import Repository from '../../../common/domain/repository/Repository';
import { QldbDriver, TransactionExecutor } from 'amazon-qldb-driver-nodejs';
import DBConnectionManager from '../../../../shared/database/DBConnectionManager';

@injectable()
export default class SignFindOneRepositoryQuantum implements Repository<string, Document> {
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
      const data: DocumentData = JSON.parse(JSON.stringify(result.getResultList().at(0).fields().at(2).at(1)));
      const metadata: Metadata = JSON.parse(JSON.stringify(result.getResultList().at(0).fields().at(3).at(1)));
      console.log('SignFindOneRepositoryQuantum', data);
      console.log('SignFindOneRepositoryQuantum', metadata);
      const document = new Document(
        data.getOverrideMinimumRequiredLevel(),
        data.getFact(),
        data.getPipeline(),
        data.getOverrides(),
        data.getCreatedBy(),
        data.getApplication(),
        metadata.getId(),
        metadata.getVersion(),
        metadata.getTxTime(),
        metadata.getTxId()
      )
      return result;
    } catch(error) {
      console.log(error);
      throw error;
    } finally {
      connection.close();
    }
  }
}