import 'reflect-metadata'
import TYPES from '../../../types';
import Adapter from "../../common/adapter/Adapter";
import UseCase from "../../common/useCase/UseCase";
import SignCreateAdapterParams from "../domain/DTO/SignCreateAdapterParams.dto";
import { inject, injectable } from 'inversify'
import Document from '../domain/entity/Document';

@injectable()
export default class SignCreateAdapter implements Adapter<SignCreateAdapterParams, string> {
  private signCreateUseCase: UseCase<Partial<Document>, string>;

  constructor(
    @inject(TYPES.SignCreateUseCase) signCreateUseCase: UseCase<Partial<Document>, string>
  ) {
    this.signCreateUseCase = signCreateUseCase;
  }

  async execute(signCreateAdapterParams: SignCreateAdapterParams): Promise<string> {
    const document: Partial<Document> = new Document(
      signCreateAdapterParams.overrideMaximumRequiredLevel,
      signCreateAdapterParams.fact,
      signCreateAdapterParams.pipeline,
      signCreateAdapterParams.overrides,
      signCreateAdapterParams.user,
      signCreateAdapterParams.application,
      signCreateAdapterParams.id
    );

    const id = await this.signCreateUseCase.execute(document);

    return id;
  }
}