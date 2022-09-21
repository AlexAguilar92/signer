import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import UseCase from "../../common/useCase/UseCase";
import TYPES from '../../../types';
import Repository from '../../common/domain/repository/Repository';
import Document from '../domain/entity/Document';

@injectable()
export default class SignCreateUseCase implements UseCase<Partial<Document>, string> {
  private signCreateRepositoryQuantum: Repository<Partial<Document>, string>;
  private signFindOneRepositoryQuantum: Repository<string, any>;

  constructor (
    @inject(TYPES.SignCreateRepositoryQuantum) signCreateRepositoryQuantum: Repository<Document, string>,
    @inject(TYPES.SignFindOneRepositoryQuantum) signFindOneRepositoryQuantum: Repository<string, any>
  ) {
    this.signCreateRepositoryQuantum = signCreateRepositoryQuantum;
    this.signFindOneRepositoryQuantum = signFindOneRepositoryQuantum;
  }

  async execute(document: Partial<Document>): Promise<string> {
    const id = document.getMetadata().getId();
    //update
    if(id) {
      
      const foundDocument = await this.signFindOneRepositoryQuantum.execute(id);

      // Check if minimum lvl is higher than the last one
      // if so update de document
      
      // Check if every override is higher than the last one
      // if so update the document
      console.log('SignCreateUseCase foundDocument', foundDocument);
    }
    //insert
    // console.log('SignCreateUseCase document', document);
    return 'yes'// return await this.signCreateRepositoryQuantum.execute(document)
  }
}