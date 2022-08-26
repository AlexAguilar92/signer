import MapperService from "../../../shared/utils/mapper/MapperService";
import DocumentDTO from "../domain/DTO/DocumentDTO";
import Document from "../domain/entity/Document";

export default class SignMapperService extends MapperService<Document, DocumentDTO> {
  public override map(entity: Document): DocumentDTO {
    return {
      overrideMinimumRequiredLevel: entity.,
      fact: object,
      pipeline: object,
      template: string
    }
  }
}