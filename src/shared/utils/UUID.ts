import { validate } from 'uuid';

export abstract class UUID {
  readonly validUUID: boolean;

  constructor(uuid: string) {
    this.validUUID = this.isUUID(uuid);
  }

  private isUUID(uuid) {
    if (!uuid || typeof uuid !== 'string') {
      return false;
    } else {
      const validUUID = validate(uuid);

      return validUUID;
    }
  }
}
