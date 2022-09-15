export default class Metadata {
  id?: string;
  version?: number;
  txTime?: string;
  txId?: string

  constructor (
    id?: string,
    version?: number,
    txTime?: string,
    txId?: string
  ) {
    this.id = id;
    this.version = version;
    this.txTime = txTime;
    this.txId = txId
  }

  getId(): string {
    return this.id;
  }

  setId(id: string) {
    this.id = id;
  }

  getVersion(): number {
    return this.version;
  }

  setVersion(version: number) {
    this.version = version;
  }

  getTxTime(): string {
    return this.txTime;
  }

  setTxTime(txTime: string) {
    this.txTime = txTime;
  }

  getTxId(): string {
    return this.txId;
  }

  setTxId(txId: string) {
    this.txId = txId;
  }
}