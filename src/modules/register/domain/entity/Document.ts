import DefaultEntity from "../../../common/domain/entity/DefaultEntity";

export default class Document extends DefaultEntity {
  private overrideMinimumRequiredLevel: string;
  private fact: object;
  private pipeline: object;
  private template: string;
  private overrides: object;

  constructor(
    overrideMinimumRequiredLevel: string,
    fact: object,
    pipeline: object,
    template: string,
    overrides: object,
    user: string
  ) {
    super(user);
    this.overrideMinimumRequiredLevel = overrideMinimumRequiredLevel
    this.fact = fact
    this.pipeline = pipeline
    this.template = Buffer.from(template).toString('base64')
    this.overrides = overrides
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

  getTemplate() {
    return this.template;
  }

  getOverrides() {
    return this.overrides;
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

  setTemplate(template: string) {
    this.template = template;
  }

  setOverrides(overrides: object) {
    this.overrides = overrides;
  }
}