import MapperService from "../../../../shared/utils/mapper/MapperService";
import DocumentDTO from "../DTO/DocumentDTO";
import Document from "../entity/Document";

export default class SignMapperService extends MapperService<Document, DocumentDTO> {
  public map(entity: Document): DocumentDTO {
    return {
      overrideMaximumRequiredLevel: entity.,
      fact: object,
      pipeline: object,
      template: string
    }
  }
}