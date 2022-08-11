import DefaultEntity from "../../../common/domain/entity/DefaultEntity";

export default class Document extends DefaultEntity {
  overrideMinimumRequiredLevel: string;
  fact: object;
  pipeline: object;
  template: object;
}