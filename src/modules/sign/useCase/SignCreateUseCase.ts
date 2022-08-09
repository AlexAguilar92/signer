import 'reflect-metadata';
import { injectable } from 'inversify';
import UseCase from "../../common/useCase/UseCase";
import SignCreateUseCaseParams from "../domain/DTO/SignCreateUseCaseParams.dto";

@injectable()
export default class SignCreateUseCase implements UseCase<SignCreateUseCaseParams, string> {
  async execute(port: SignCreateUseCaseParams): Promise<string> {
    return '1'
  }
}