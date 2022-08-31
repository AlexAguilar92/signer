export default class DefaultEntity {
  private createdBy: string;
  private active: boolean;

  constructor (
    createdBy: string,
    active: boolean = true
  ) {
    this.createdBy = createdBy;
    this.active = active;
  }

  getCreatedBy(): string {
    return this.createdBy;
  }

  setCreatedBy(createdBy: string) {
    this.createdBy = createdBy;
  }

  getActive(): boolean {
    return this.active;
  }

  setActive(active: boolean) {
    this.active = active;
  }
}