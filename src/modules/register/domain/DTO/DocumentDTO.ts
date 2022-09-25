import DefaultEntityDTO from "../../../common/domain/DTO/DefaultEntityDTO";

export default interface DocumentDTO extends DefaultEntityDTO {
  overrideMaximumRequiredLevel: string,
  fact: object,
  pipeline: object,
  template: string
}