import 'reflect-metadata';
import { Container } from 'inversify';
import TYPES from '../../../src/types';

import Adapter from '../../../src/modules/common/adapter/Adapter';
import UseCase from '../../../src/modules/common/useCase/UseCase';
import Repository from '../../../src/modules/common/domain/repository/Repository';

//#region Entities
import Document from '../../../src/modules/sign/domain/entity/Document';
//#endregion

//#region SignCreate
import SignCreateAdapter from '../../../src/modules/sign/adapter/SignCreateAdapter';
import SignCreateAdapterParams from '../../../src/modules/sign/domain/DTO/SignCreateAdapterParams.dto';
import SignCreateUseCase from '../../../src/modules/sign/useCase/SignCreateUseCase'
import SignCreateUseCaseParams from '../../../src/modules/sign/domain/DTO/SignCreateUseCaseParams.dto';
import SignCreateRepositoryQuantum from '../../../src/modules/sign/domain/repository/SignCreateRepositoryQuantum';
//#endregion

const container: Container = new Container();

//#region SignCreate
container.bind<Adapter<SignCreateAdapterParams, string>>(TYPES.SignCreateAdapter).to(SignCreateAdapter);
container.bind<UseCase<SignCreateUseCaseParams, string>>(TYPES.SignCreateUseCase).to(SignCreateUseCase);
container.bind<Repository<Document, string>>(TYPES.SignCreateRepository).to(SignCreateRepositoryQuantum);
//#endregion

export default container;