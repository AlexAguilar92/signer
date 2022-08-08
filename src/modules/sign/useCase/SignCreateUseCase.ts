import UseCase from "../../common/useCase/UseCase";
import SignCreateUseCaseParams from "../domain/DTO/SignCreateUseCaseParams.dto";

export default class SignCreateUseCase implements UseCase<SignCreateUseCaseParams, U> {
  port(port: SignCreateUseCaseParams): Promise<U> {
    throw new Error("Method not implemented.");
  }
}