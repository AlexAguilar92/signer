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
  
  async execute(id?: string): Promise<Document> {
    const connection = await this.dBConnectionManagerQuantum.connect();
    try {
      const result = await connection.executeLambda(async (txn: TransactionExecutor) => {
        return await txn.execute('SELECT * FROM _ql_committed_Documents as doc WHERE doc.metadata.id = ?', id);
      });

      const unformattedData = JSON.parse(JSON.stringify(result.getResultList().at(0).fields().at(2).at(1)));
      const unformattedMetadata = JSON.parse(JSON.stringify(result.getResultList().at(0).fields().at(3).at(1)));

      const data: DocumentData = new DocumentData(
        unformattedData.overrideMinimumRequiredLevel,
        unformattedData.fact,
        unformattedData.pipeline,
        unformattedData.overrides,
        unformattedData.application
      );

      const metadata: Metadata = new Metadata(
        unformattedMetadata.id,
        unformattedMetadata.version,
        unformattedMetadata.txTime,
        unformattedMetadata.txId
      );

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
        metadata.getTxId(),
        data.getStatus()
      );

      // console.log('document', document)
      return document;
    } catch(error) {
      console.log(error);
      throw error;
    } finally {
      connection.close();
    }
  }
}