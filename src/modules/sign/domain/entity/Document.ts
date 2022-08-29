import DefaultEntity from "../../../common/domain/entity/DefaultEntity";

export default class Document extends DefaultEntity {
  private _overrideMinimumRequiredLevel: string;
  private _fact: object;
  private _pipeline: object;
  private _template: string;

  constructor(
    overrideMinimumRequiredLevel: string,
    fact: object,
    pipeline: object,
    template: string
  ) {
    super('alex', 'alex');
    this._overrideMinimumRequiredLevel = overrideMinimumRequiredLevel
    this._fact = fact
    this._pipeline = pipeline
    this._template = Buffer.from(template).toString('base64')
  }

  get overrideMinimumRequiredLevel() {
    return this._overrideMinimumRequiredLevel;
  }

  get fact() {
    return this._fact;
  }

  get pipeline() {
    return this._pipeline;
  }

  get template() {
    return this._template;
  }

  set overrideMinimumRequiredLevel(overrideMinimumRequiredLevel: string) {
    this._overrideMinimumRequiredLevel = overrideMinimumRequiredLevel;
  }

  set fact(fact: object) {
    this._fact = fact;
  }

  set pipeline(pipeline: object) {
    this._pipeline = pipeline;
  }

  set template(template: string) {
    this._template = template;
  }
}