import 'reflect-metadata';
import { Container } from 'inversify';
import TYPES from '../../../src/types';

import Adapter from '../../../src/modules/common/adapter/Adapter';
import UseCase from '../../../src/modules/common/useCase/UseCase';
import Repository from '../../../src/modules/common/domain/repository/Repository';

//#region Database
import { QldbDriver } from 'amazon-qldb-driver-nodejs';
import QuantumConfiguration from '../../../src/shared/database/QuantumConfiguration';
import DBConnectionManagerQuantum from '../../../src/shared/database/DBConnectionManagerQuantum';
//#endregion

//#region Entities
import Document from '../../../src/modules/sign/domain/entity/Document';
//#endregion

//#region SignCreate
import SignCreateAdapter from '../../../src/modules/sign/adapter/SignCreateAdapter';
import SignCreateAdapterParams from '../../../src/modules/sign/domain/DTO/SignCreateAdapterParams.dto';
import SignCreateUseCase from '../../../src/modules/sign/useCase/SignCreateUseCase'
import SignCreateRepositoryQuantum from '../../../src/modules/sign/domain/repository/SignCreateRepositoryQuantum';
import DBConnectionManager from '../../../src/shared/database/DBConnectionManager';
//#endregion

const container: Container = new Container();

//#region Database
container.bind<DBConnectionManager<QldbDriver>>(TYPES.DBConnectionManager).to(DBConnectionManagerQuantum)
container.bind<QuantumConfiguration>(TYPES.QuantumConfiguration).to(QuantumConfiguration);
//#endregion

//#region SignCreate
container.bind<Adapter<SignCreateAdapterParams, string>>(TYPES.SignCreateAdapter).to(SignCreateAdapter);
container.bind<UseCase<Partial<Document>, string>>(TYPES.SignCreateUseCase).to(SignCreateUseCase);
container.bind<Repository<Document, string>>(TYPES.SignCreateRepository).to(SignCreateRepositoryQuantum);
//#endregion

export default container;