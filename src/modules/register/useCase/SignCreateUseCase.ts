import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import UseCase from "../../common/useCase/UseCase";
import TYPES from '../../../types';
import Repository from '../../common/domain/repository/Repository';
import Document from '../domain/entity/Document';

@injectable()
export default class SignCreateUseCase implements UseCase<Partial<Document>, Document | string> {
  private signCreateRepositoryQuantum: Repository<Partial<Document>, string>;
  private signFindOneRepositoryQuantum: Repository<string, Document>;
  private signUpdateRepositoryQuantum: Repository<Document, Document>;

  constructor (
    @inject(TYPES.SignCreateRepositoryQuantum) signCreateRepositoryQuantum: Repository<Document, string>,
    @inject(TYPES.SignFindOneRepositoryQuantum) signFindOneRepositoryQuantum: Repository<string, Document>,
    @inject(TYPES.SignUpdateRepositoryQuantum) signUpdateRepositoryQuantum: Repository<Document, Document>
  ) {
    this.signCreateRepositoryQuantum = signCreateRepositoryQuantum;
    this.signFindOneRepositoryQuantum = signFindOneRepositoryQuantum;
    this.signUpdateRepositoryQuantum = signUpdateRepositoryQuantum;
  }

  async execute(document: Partial<Document>): Promise<Document | string> {
    const id = document.getMetadata().getId();

    if(id) {
      
      const foundDocument: Document = await this.signFindOneRepositoryQuantum.execute(id);
      
      // Check if minimum lvl is higher than the last one
      // if so update the document
      if (document.getData().getOverrideMaximumRequiredLevel() > foundDocument.getData().getOverrideMaximumRequiredLevel()) {
        //update
        const updatedDocument: Document = await this.signUpdateRepositoryQuantum.execute(document as Document);
        console.log('si cae aquí');
        throw new Error('Not implemented yet');
      }

      console.log('overrides', document.getData().getOverrides());

      const documentOverridesKeys: Array<string> = Object.keys(document.getData().getOverrides());
      console.log("documentOverridesKeys", documentOverridesKeys);
      const foundDocumentOverridesKeys: Array<string> = Object.keys(foundDocument.getData().getOverrides());
      console.log("foundDocumentOverridesKeys", foundDocumentOverridesKeys);

      //Look for overrides changes if so then create a new document
      const overridesLengthDelta: number = documentOverridesKeys.length - foundDocumentOverridesKeys.length;
      console.log('overridesLengthDelta', overridesLengthDelta);
      if(overridesLengthDelta !== 0) return //update //await this.signCreateRepositoryQuantum.execute(document);

      console.group('keys');
      //Look for document overrides differences and level up changes if so create a new document
      const results: number = documentOverridesKeys
        .reduce(
          (previousValue, key) => {
            console.log(key)
            if (!foundDocumentOverridesKeys.includes(key)) return ++previousValue;
            if (
                foundDocumentOverridesKeys.includes(key)
                &&
                foundDocument.getData().getOverrides()[key]['level'] < document.getData().getOverrides()[key]['level']
              ) return ++previousValue;
            return 0;
          }
        , 0
        );
      console.groupEnd();
      console.log('\n');
      console.log('reduce', results);

      if(results !== 0) //update
      // console.log('document', document);
      // console.log('foundDocument', foundDocument);
      // Check if every override is higher than the last one
      // if so update the document
      // console.log('SignCreateUseCase foundDocument', foundDocument);
      return foundDocument;
    }
    //insert
    // console.log('SignCreateUseCase document', document);
    return await this.signCreateRepositoryQuantum.execute(document)
  }
}