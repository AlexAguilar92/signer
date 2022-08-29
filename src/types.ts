const TYPES = {

  //#region DBConnectionManager
  DBConnectionManager: Symbol.for('DBConnectionManager'),
  QuantumConfiguration: Symbol.for('QuantumConfiguration'),
  //#endregion

  //#region sign
  SignCreateAdapter: Symbol.for('SignCreateAdapter'),
  SignCreateUseCase: Symbol.for('SignCreateUseCase'),
  SignCreateRepository: Symbol.for('SignCreateRepository')
  //#endregion

}

export default TYPES;