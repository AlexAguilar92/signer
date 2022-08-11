import Repository from "../../../common/domain/repository/Repository";
import Document from "../entity/Document";

export default class SignCreateRepositoryQuantum implements Repository<Document> {
  execute(document: Partial<Document>): Promise<Document> {
    throw new Error("Method not implemented.");
  }
}