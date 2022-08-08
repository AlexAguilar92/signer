import { injectable } from 'inversify';
import { DataSource, QueryRunner } from 'typeorm';

import Exception from '../../error/Exception';
import HttpStatusCode from '../../enums/httpStatusCode';
import ErrorCode from '../../error/errorCode';

import DBConnectionHelper from '../../helpers/DBConnectionHelper';
import IDBConnectionManager from '../interface/IDBConnectionManager';

import Secrets from '../../utils/aws/secrets';
@injectable()
export default class DBConnectionManager implements IDBConnectionManager {
  private queryRunner: QueryRunner;
  private connection: DataSource;
  private secrets: any;

  private async connect(): Promise<DataSource> {
    // tslint:disable-next-line:no-console
    try {
      console.log('🚀 ~ DBConnectionManager: Connect');
      if (process.env.ENVIRONMENT !== 'local') {
        if (!this.secrets) this.secrets = await new Secrets().get();
      } else {
        this.secrets = {
          username: process.env.POSTGRES_DB_USERNAME,
          password: process.env.POSTGRES_DB_PASSWORD,
          host: process.env.POSTGRES_DB_HOST,
          port: process.env.POSTGRES_DB_PORT,
          dbname: process.env.POSTGRES_DB_NAME,
        };
      }

      if (!this.connection) {
        const { dbname, port, password, host, username } = this.secrets;
        const url = `postgres://${username}:${password}@${host}:${port}/${dbname}`;
        this.connection = await new DBConnectionHelper().connect(url);
      } else if (!this.connection.isInitialized) {
        await this.connection.initialize();
      }
      console.log('🚀 ~ DBConnectionManager: Connected');
      return this.connection;
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.log(error);
      throw error;
    }
  }

  private async beginTransaction(): Promise<QueryRunner> {
    try {
      console.log('🚀 ~ DBConnectionManager: Begin Transaction');
      await this.connect();

      if (!this.queryRunner || this.queryRunner.isReleased) {
        this.queryRunner = this.connection.createQueryRunner();
        await this.queryRunner.startTransaction();
      }

      console.log('🚀 ~ DBConnectionManager: Transaction created');
      return this.queryRunner;
    } catch (error) {
      console.log(error);
      throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, [ErrorCode.ERR0014], []);
    }
  }

  async getConnection(): Promise<DataSource> {
    return this.connection && this.connection.isInitialized ? this.connection : this.connect();
  }

  async getTransaction(): Promise<QueryRunner> {
    return this.queryRunner && !this.queryRunner.isReleased ? this.queryRunner : this.beginTransaction();
  }

  async getActiveConnection(): Promise<DataSource | QueryRunner> {
    return this.queryRunner && this.queryRunner.isTransactionActive ? this.getTransaction() : this.getConnection();
  }

  async endTransaction(): Promise<void> {
    try {
      console.log('🚀 ~ DBConnectionManager: End Transaction');
      await this.queryRunner?.release();
    } catch (error) {
      console.log(error);
      throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, [ErrorCode.ERR0015], []);
    }
  }

  async disconnect(): Promise<void> {
    try {
      console.log('🚀 ~ DBConnectionManager: Disconnect');
      await this.connection?.destroy();
    } catch (error) {
      console.log(error);
      throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, [ErrorCode.ERR0000], []);
    }
  }
}
