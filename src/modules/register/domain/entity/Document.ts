import DefaultEntity from "../../../common/domain/entity/DefaultEntity";

export default class Document extends DefaultEntity {
  private overrideMinimumRequiredLevel: string;
  private fact: object;
  private pipeline: object;
  private overrides: object;
  private application: string;

  constructor(
    overrideMinimumRequiredLevel: string,
    fact: object,
    pipeline: object,
    overrides: object,
    user: string,
    application: string,
    id?: string
  ) {
    super(user, id);
    this.overrideMinimumRequiredLevel = overrideMinimumRequiredLevel
    this.fact = fact
    this.pipeline = pipeline
    this.overrides = overrides
    this.application = application
  }

  getOverrideMinimumRequiredLevel() {
    return this.overrideMinimumRequiredLevel;
  }

  getFact() {
    return this.fact;
  }

  getPipeline() {
    return this.pipeline;
  }

  getOverrides() {
    return this.overrides;
  }

  getApplication() {
    return this.application;
  }

  setOverrideMinimumRequiredLevel(overrideMinimumRequiredLevel: string) {
    this.overrideMinimumRequiredLevel = overrideMinimumRequiredLevel;
  }

  setFact(fact: object) {
    this.fact = fact;
  }

  setPipeline(pipeline: object) {
    this.pipeline = pipeline;
  }

  setOverrides(overrides: object) {
    this.overrides = overrides;
  }

  setApplication(application: string) {
    this.application = application;
  }
}