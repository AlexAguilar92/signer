import { injectable } from 'inversify';
import ILoggedUser from '../interface/ILoggedUser';

@injectable()
export default class LoggedUser implements ILoggedUser {
  private username: string;

  setUsername(username: string): void {
    this.username = username;
  }

  getUsername(): string {
    return this.username;
  }
}
