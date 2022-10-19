import { bool } from "aws-sdk/clients/signer";

type DocumentDataSign = {
  overrideMaximumRequiredLevel: string,
  fact: object,
  pipeline: string,
  overrides: object,
  application: string,
  createdBy?: string,
  status?: boolean,
}

export default class DocumentData {
  private overrideMaximumRequiredLevel: string;
  private fact: object;
  private pipeline: string;
  private overrides: object;
  private createdBy: string;
  private signedBy: string
  private application: string;
  private status: bool;

  constructor(documentParams: DocumentDataSign);
  constructor (documentParams: string);
  constructor(documentParams: DocumentDataSign | string) {
    if (typeof documentParams === 'string') {
      this.signedBy;
    }
    else {
      this.overrideMaximumRequiredLevel = documentParams.overrideMaximumRequiredLevel;
      this.fact = documentParams.fact;
      this.pipeline = documentParams.pipeline;
      this.overrides = documentParams.overrides;
      this.application = documentParams.application;
      this.createdBy = documentParams.createdBy;
      this.status = documentParams.status ?? true;
    }
    
  }

  getOverrideMaximumRequiredLevel() {
    return this.overrideMaximumRequiredLevel;
  }
  
  setOverrideMaximumRequiredLevel(overrideMaximumRequiredLevel: string) {
    this.overrideMaximumRequiredLevel = overrideMaximumRequiredLevel;
  }

  getFact(): object {
    return this.fact;
  }

  setFact(fact: object) {
    this.fact = fact;
  }
  
  getPipeline() {
    return this.pipeline;
  }

  setPipeline(pipeline: string) {
    this.pipeline = pipeline;
  }

  getOverrides(): object {
    return this.overrides;
  }
  
  setOverrides(overrides: object) {
    this.overrides = overrides;
  }

  getApplication(): string {
    return this.application;
  }

  setApplication(application: string) {
    this.application = application;
  }

  getStatus(): bool {
    return this.status;
  }

  setStatus(status: bool) {
    this.status = status;
  }

  getCreatedBy(): string {
    return this.createdBy;
  }

  setCreatedBy(createdBy: string) {
    this.createdBy = createdBy;
  }

  getSignedBy(): string {
    return this.signedBy;
  }

  setSignedBy(signedBy: string) {
    this.signedBy = signedBy;
  }
}