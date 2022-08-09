import 'reflect-metadata';
import { Container } from 'inversify';
import TYPES from '../../../src/types';

import Adapter from '../../../src/modules/common/adapter/Adapter';

//#region SignCreate
import SignCreateAdapter from '../../../src/modules/sign/adapter/SignCreateAdapter';
import SignCreateAdapterParams from '../../../src/modules/sign/domain/DTO/SignCreateAdapterParams.dto';
import SignCreateUseCase from '../../../src/modules/sign/useCase/SignCreateUseCase'
import UseCase from '../../../src/modules/common/useCase/UseCase';
import SignCreateUseCaseParams from '../../../src/modules/sign/domain/DTO/SignCreateUseCaseParams.dto';
//#endregion

const container: Container = new Container();

//#region SignCreate
container.bind<Adapter<SignCreateAdapterParams, string>>(TYPES.SignCreateAdapter).to(SignCreateAdapter);
container.bind<UseCase<SignCreateUseCaseParams, string>>(TYPES.SignCreateUseCase).to(SignCreateUseCase);
//#endregion

export default container;