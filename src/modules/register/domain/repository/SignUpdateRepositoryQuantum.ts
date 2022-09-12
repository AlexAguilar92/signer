import { QldbDriver, TransactionExecutor } from "amazon-qldb-driver-nodejs";
import { inject, injectable } from "inversify";
import DBConnectionManager from "../../../../shared/database/DBConnectionManager";
import TYPES from "../../../../types";
import Repository from "../../../common/domain/repository/Repository";
import Document from "../entity/Document";

@injectable()
export default class SignUpdateRepositoryQuantum implements Repository<Document, Document> {
  private dBConnectionManagerQuantum: DBConnectionManager<QldbDriver>;

  constructor(
    @inject(TYPES.DBConnectionManager) dBConnectionManagerQuantum: DBConnectionManager<QldbDriver>
  ) {
    this.dBConnectionManagerQuantum = dBConnectionManagerQuantum
  }

  async execute(document: Document): Promise<Document> {
    const connection = await this.dBConnectionManagerQuantum.connect();
    try {
      const result = await connection.executeLambda(async (txn: TransactionExecutor) => {
        return await txn.execute('UPDATE _ql_committed_Documents SET ? WHERE doc.metadata.id = ?', document, document.getId());
      });
      console.log('SignUpdateRepositoryQuantum', result)
      return document;
      // return result.getResultList().at(0).fields().at(0).at(1).toString();
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      connection.close();
    }
  }
}