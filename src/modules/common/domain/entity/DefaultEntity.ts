import { v4 as uuidv4 } from 'uuid';

export default class DefaultEntity {
  private _id: string;
  private _createdAt: Date;
  private _createdBy: string;
  private _active: boolean;

  constructor (
    createdBy: string,
    id: string = uuidv4(),
    createdAt: Date = new Date(),
    active: boolean = true
  ) {
    this._id = id;
    this._createdAt = createdAt;
    this._createdBy = createdBy;
    this._active = active;
  }

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(createdAt: Date) {
    this._createdAt = createdAt;
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