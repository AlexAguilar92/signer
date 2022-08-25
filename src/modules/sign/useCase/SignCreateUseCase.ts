import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import UseCase from "../../common/useCase/UseCase";
// import SignCreateUseCaseParams from "../domain/DTO/SignCreateUseCaseParams.dto";
import TYPES from '../../../types';
// import SignCreateRepositoryQuantum from '../domain/repository/SignCreateRepositoryQuantum';
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

  async execute(port: Partial<Document>): Promise<string> {
    return await this.signCreateRepositoryQuantum.execute(port)
  }
}