import Metadata from "../../../common/domain/entity/Metadata";
import DocumentData from "./DocumentData";

/**
 * TODO: Split into object value and inherit from Entity which implements Metadata and a generic
 */
export default class Document {
  private data: DocumentData;
  private metadata?: Metadata;

  constructor(
    overrideMinimumRequiredLevel: string,
    fact: object,
    pipeline: string,
    overrides: object,
    user: string,
    application: string,
    id?: string,
    version?: number,
    txTime?: string,
    txId?: string,
    status = true
  ) {

    this.data = new DocumentData (
      overrideMinimumRequiredLevel,
      fact,
      pipeline,
      overrides,
      application,
      user,
      status
    )

    this.metadata = new Metadata (
      id,
      version,
      txTime,
      txId
    )

  }

  getData(): DocumentData {
    return this.data;
  }

  getMetadata(): Metadata {
    return this.metadata;
  }

  // getOverrideMinimumRequiredLevel() {
  //   return this.overrideMinimumRequiredLevel;
  // }

  // getFact() {
  //   return this.fact;
  // }

  // getPipeline() {
  //   return this.pipeline;
  // }

  // getOverrides() {
  //   return this.overrides;
  // }

  // getApplication() {
  //   return this.application;
  // }

  // setOverrideMinimumRequiredLevel(overrideMinimumRequiredLevel: string) {
  //   this.overrideMinimumRequiredLevel = overrideMinimumRequiredLevel;
  // }

  // setFact(fact: object) {
  //   this.fact = fact;
  // }

  // setPipeline(pipeline: object) {
  //   this.pipeline = pipeline;
  // }

  // setOverrides(overrides: object) {
  //   this.overrides = overrides;
  // }

  // setApplication(application: string) {
  //   this.application = application;
  // }
}