import { ClientConfiguration } from "aws-sdk/clients/acm";
import { Agent } from "http";

export default class QuantumConfiguration {
  private _maxConcurrentTransactions: number;
  private _agentForQldb: Agent;
  private _serviceConfigurationOptions: ClientConfiguration;
  private _retryLimit: number;

  constructor () {
    this._maxConcurrentTransactions = 10;
    this._agentForQldb = new Agent({
      keepAlive: true,
      maxSockets: this._maxConcurrentTransactions
    });
    this._serviceConfigurationOptions = {
      region: "us-east-1",
      httpOptions: {
        agent: this._agentForQldb
      }
    };
    this._retryLimit = 4
  }

  get maxConcurrentTransactions(): number {
    return this._maxConcurrentTransactions;
  }

  get agentForQldb(): Agent {
    return this._agentForQldb;
  }

  get serviceConfigurationOptions(): ClientConfiguration {
    return this._serviceConfigurationOptions;
  }

  get retryLimit(): number {
    return this._retryLimit;
  }

  set maxConcurrentTransactions(maxConcurrentTransactions: number) {
    this._maxConcurrentTransactions = maxConcurrentTransactions;
  }

  set agentForQldb(agentForQldb: Agent) {
    this._agentForQldb = agentForQldb;
  }

  set serviceConfigurationOptions(serviceConfigurationOptions: ClientConfiguration) {
    this._serviceConfigurationOptions = serviceConfigurationOptions
  }

  set retryLimit(retryLimit: number) {
    this._retryLimit = retryLimit
  }
}