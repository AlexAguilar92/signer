import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import UseCase from "../../common/useCase/UseCase";
import TYPES from '../../../types';
import Repository from '../../common/domain/repository/Repository';
import Document from '../domain/entity/Document';

@injectable()
export default class SignCreateUseCase implements UseCase<Partial<Document>, string> {
  private signCreateRepositoryQuantum: Repository<Partial<Document>, string>

  constructor (
    @inject(TYPES.SignCreateRepository) signCreateRepositoryQuantum: Repository<Document, string>
  ) {
    this.signCreateRepositoryQuantum = signCreateRepositoryQuantum;
  }

  async execute(document: Partial<Document>): Promise<string> {
    if(document.getId())
      console.log('id')
    console.log('SignCreateUseCase', document)
    return 'yes'
    // return await this.signCreateRepositoryQuantum.execute(document)
  }
}