import { RetryConfig } from "amazon-qldb-driver-nodejs";
import { ClientConfiguration } from "aws-sdk/clients/acm";
import { Agent } from "https";
import { injectable } from "inversify";

@injectable()
export default class QuantumConfiguration {
  private _ledgerName: string;
  private _maxConcurrentTransactions: number;
  private _agentForQldb: Agent;
  private _serviceConfigurationOptions: ClientConfiguration;
  private _retryLimit: number;
  private _retryConfig: RetryConfig

  constructor () {
    this._ledgerName = 'Prueba1';
    this._maxConcurrentTransactions = 10;
    this._agentForQldb = new Agent({
      keepAlive: true,
      maxSockets: this._maxConcurrentTransactions,

    });
    this._serviceConfigurationOptions = {
      region: "us-east-1",
      httpOptions: {
        agent: this._agentForQldb
      }
    };
    this._retryLimit = 4;
    this._retryConfig = new RetryConfig(this._retryLimit);
  }

  get ledgerName(): string {
    return this._ledgerName;
  }

  set ledgerName(ledgerName: string) {
    this._ledgerName = ledgerName;
  }

  get maxConcurrentTransactions(): number {
    return this._maxConcurrentTransactions;
  }

  set maxConcurrentTransactions(maxConcurrentTransactions: number) {
    this._maxConcurrentTransactions = maxConcurrentTransactions;
  }

  get agentForQldb(): Agent {
    return this._agentForQldb;
  }

  set agentForQldb(agentForQldb: Agent) {
    this._agentForQldb = agentForQldb;
  }

  get serviceConfigurationOptions(): ClientConfiguration {
    return this._serviceConfigurationOptions;
  }
  set serviceConfigurationOptions(serviceConfigurationOptions: ClientConfiguration) {
    this._serviceConfigurationOptions = serviceConfigurationOptions
  }

  get retryConfig(): RetryConfig {
    return this._retryConfig;
  }

  set retryConfig(retryConfig: RetryConfig) {
    this._retryConfig = retryConfig
  }
}