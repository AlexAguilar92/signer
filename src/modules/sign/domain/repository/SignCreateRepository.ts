import 'reflect-metadata'
import { inject } from 'inversify';
import DBConnectionManager from '../../../../shared/database/implementation/DBConnectionManager'
import BaseCreateRepository from '../../../common/domain/repository/BaseCreateRepository'
import Document from '../entity/Document';
import TYPES from '../../../../types';
import SignCreateQueryParams from './SignCreateQueryParams';

export default class SignCreateRepository extends BaseCreateRepository<Document, U> {
  private dBConnectionManager: DBConnectionManager;

  constructor(
    @inject(TYPES.DBConnectionManager) dBConnectionManager: DBConnectionManager
  ) {
    super()
    this.dBConnectionManager = dBConnectionManager;
  }

  buildQuery(singCreateQueryParams: SignCreateQueryParams) {
    try {
      return new Document()
    } catch (error) {
      console.log(error)
    }
  }
}