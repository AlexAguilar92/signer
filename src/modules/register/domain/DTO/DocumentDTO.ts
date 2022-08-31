import DefaultEntityDTO from "../../../common/domain/DTO/DefaultEntityDTO";

export default interface DocumentDTO extends DefaultEntityDTO {
  overrideMinimumRequiredLevel: string,
  fact: object,
  pipeline: object,
  template: string
}