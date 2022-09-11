const TYPES = {

  //#region DBConnectionManager
  DBConnectionManager: Symbol.for('DBConnectionManager'),
  QuantumConfiguration: Symbol.for('QuantumConfiguration'),
  //#endregion

  //#region RegisterCreate
  SignCreateAdapter: Symbol.for('SignCreateAdapter'),
  SignCreateUseCase: Symbol.for('SignCreateUseCase'),
  SignCreateRepository: Symbol.for('SignCreateRepository'),
  //#endregion

  //#region RegisterFindOne
  SignFindOneAdapter: Symbol.for('SignFindOneAdapter'),
  SignFindOneRepository: Symbol.for('SignFindOneRepository')
  //#endregion

}

export default TYPES;