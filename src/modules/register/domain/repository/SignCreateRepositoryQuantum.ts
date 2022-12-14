import 'reflect-metadata'
import TYPES from "../../../../types";
import Document from "../entity/Document";
import { inject, injectable } from "inversify";
import Repository from "../../../common/domain/repository/Repository";
import { QldbDriver, TransactionExecutor } from "amazon-qldb-driver-nodejs";
import DBConnectionManager from "../../../../shared/database/DBConnectionManager";

@injectable()
export default class SignCreateRepositoryQuantum implements Repository<Partial<Document>, string> {
  private dBConnectionManagerQuantum: DBConnectionManager<QldbDriver>;

  constructor (
    @inject(TYPES.DBConnectionManager) dBConnectionManagerQuantum: DBConnectionManager<QldbDriver>
  ) {
    this.dBConnectionManagerQuantum = dBConnectionManagerQuantum
  }
  
  async execute(document: Partial<Document>): Promise<string> {
    const connection = await this.dBConnectionManagerQuantum.connect();
    // console.log('document.data:', document.getData())
    try {
      const result = await connection.executeLambda(async (txn: TransactionExecutor) => {
        return await txn.execute("INSERT INTO Documents ?", document.getData());
      });
      // console.log('SignCreateRepositoryQuantum result', result);
      return result.getResultList().at(0).fields().at(0).at(1).toString();
    } catch (error) {
      console.log('SignCreateRepositoryQuantum error', error);
      throw error;
    } finally {
      connection.close();
    }
  }
}