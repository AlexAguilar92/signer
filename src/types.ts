const TYPES = {

  //#region DBConnectionManager
  DBConnectionManager: Symbol.for('DBConnectionManager'),
  //#endregion

  //#region sign
  SignCreateAdapter: Symbol.for('SignCreateAdapter'),
  SignCreateUseCase: Symbol.for('SignCreateUseCase'),
  SignCreateRepository: Symbol.for('SignCreateRepository')
  //#endregion

}

export default TYPES;