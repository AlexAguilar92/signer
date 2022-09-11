import { inject, injectable } from "inversify";
import Adapter from "../../common/adapter/Adapter";
import DocumentDTO from "../domain/DTO/DocumentDTO";
import SignFindOneAdapterParams from "../domain/DTO/SignFindOneAdapterParams.dto";
import SignFindOneRepositoryQuantum from "../domain/repository/SignFindOneRepositoryQuantum";

@injectable()
export default class SignFindOneAdapter implements Adapter<SignFindOneAdapterParams, DocumentDTO> {

  private signFindOneRepositoryQuantum: SignFindOneRepositoryQuantum;

  constructor(
    @inject()
  ) {

  }

  execute(port?: SignFindOneAdapterParams): Promise<DocumentDTO> {
    
  }
}