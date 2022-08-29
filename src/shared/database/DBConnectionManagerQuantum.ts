import 'reflect-metadata'
import { QldbDriver } from "amazon-qldb-driver-nodejs";
import { inject, injectable } from "inversify";
import DBConnectionManager from "./DBConnectionManager";
import QuantumConfiguration from "./QuantumConfiguration";
import TYPES from '../../types';

@injectable()
export default class DBConnectionManagerQuantum implements DBConnectionManager<QldbDriver> {
  private quantumConfiguration: QuantumConfiguration;
  private connection : QldbDriver;

  constructor(
    @inject(TYPES.QuantumConfiguration) quantumConfiguration: QuantumConfiguration
  ) {
    this.quantumConfiguration = quantumConfiguration
  }

  async connect(): Promise<QldbDriver> {
    const connection = new QldbDriver(
      this.quantumConfiguration.ledgerName,
      this.quantumConfiguration.serviceConfigurationOptions,
      this.quantumConfiguration.maxConcurrentTransactions,
      this.quantumConfiguration.retryConfig
    );
    this.connection = connection;
    return connection;
  }

  async disconnect(): Promise<void> {
    this.connection.close();
  }
}