export default class DefaultEntity {
  private id: string;
  private createdBy: string;
  private active: boolean;

  constructor (
    createdBy: string,
    id?: string,
    active: boolean = true
  ) {
    this.id = id;
    this.createdBy = createdBy;
    this.active = active;
  }

  getId(): string {
    return this.id;
  }

  setId(id: string) {
    this.id = id;
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