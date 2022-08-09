import 'reflect-metadata'
import TYPES from '../../../types';
import Adapter from "../../common/adapter/Adapter";
import UseCase from "../../common/useCase/UseCase";
import SignCreateAdapterParams from "../domain/DTO/SignCreateAdapterParams.dto";
import SignCreateUseCaseParams from '../domain/DTO/SignCreateUseCaseParams.dto';
import { inject, injectable } from 'inversify'

@injectable()
export default class SignCreateAdapter implements Adapter<SignCreateAdapterParams, string> {
  private signCreateUseCase: UseCase<SignCreateUseCaseParams, string>;

  constructor(
    @inject(TYPES.SignCreateUseCase) signCreateUseCase: UseCase<SignCreateUseCaseParams, string>
  ) {
    this.signCreateUseCase = signCreateUseCase;
  }

  async execute(signCreateAdapterParams: SignCreateAdapterParams): Promise<string> {
    console.log('signCreateAdapterParams: ', signCreateAdapterParams)
    return '1'
  }
}