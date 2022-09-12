const TYPES = {

  //#region DBConnectionManager
  DBConnectionManager: Symbol.for('DBConnectionManager'),
  QuantumConfiguration: Symbol.for('QuantumConfiguration'),
  //#endregion

  //#region RegisterCreate
  SignCreateAdapter: Symbol.for('SignCreateAdapter'),
  SignCreateUseCase: Symbol.for('SignCreateUseCase'),
  SignCreateRepositoryQuantum: Symbol.for('SignCreateRepositoryQuantum'),
  //#endregion

  //#region RegisterFindOne
  SignFindOneAdapter: Symbol.for('SignFindOneAdapter'),
  SignFindOneRepositoryQuantum: Symbol.for('SignFindOneRepositoryQuantum')
  //#endregion

}

export default TYPES;