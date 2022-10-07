import { injectable } from 'inversify';
import Mapper from './Mapper';

/**
 * @abstract @class MapperService
 * @classdesc Abstract class that defines the methods that a mapper service must implement
 * @implements {IMapperService}
 * @template S
 * @template T
 * @description Abstract class that defines the methods that a mapper service must implement
 */

@injectable()
export default abstract class MapperService<S, T> implements Mapper<S, T> {
  protected abstract map(entity: S): T;

  transform(entity: S): T;
  transform(array: S[]): T[];
  transform(entityOrArray: S | S[]): T | T[] {
    return Array.isArray(entityOrArray) ? entityOrArray.map((item: S) => this.map(item)) : this.map(entityOrArray);
  }
}
