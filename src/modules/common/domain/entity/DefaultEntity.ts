import { v4 as uuidv4 } from 'uuid';

export default class DefaultEntity {
  private _createdBy: string;
  private _active: boolean;

  constructor (
    createdBy: string,
    active: boolean = true
  ) {
    this._createdBy = createdBy;
    this._active = active;
  }

  get createdBy(): string {
    return this._createdBy;
  }

  set createdBy(createdBy: string) {
    this._createdBy = createdBy;
  }

  get active(): boolean {
    return this._active;
  }

  set active(active: boolean) {
    this._active = active;
  }
}