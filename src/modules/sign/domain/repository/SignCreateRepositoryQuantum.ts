import { QldbDriver, TransactionExecutor } from "amazon-qldb-driver-nodejs";
import { injectable } from "inversify";
import Repository from "../../../common/domain/repository/Repository";
import Document from "../entity/Document";

@injectable()
export default class SignCreateRepositoryQuantum implements Repository<Partial<Document>, string> {
  // constructor (

  // ) {

  // }

  async execute(document: Partial<Document>): Promise<string> {
    // const driver: QldbDriver = new QldbDriver("quick-start");
    await driver.executeLambda(async (txn: TransactionExecutor) => {
      return (await txn.execute("INSERT INTO ");
    })
    const uuid = 'c0f0c88d-4e1e-49df-a9f1-a9968727d0c4';
    console.log('document', document, Buffer.from(document.template, 'base64').toString('utf8'))
    return uuid;
  }
}