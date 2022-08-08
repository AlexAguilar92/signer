import { injectable } from 'inversify';
import IPaginationQueryDTO from '../../../dto/common/IPaginationQueryDTO';
import IPaginationResponseDTO from '../../../dto/common/IPaginationResponseDTO';
import IPaginateService from './IPaginateService';

/**
 * @class PaginateService
 * @classdesc Abstract class that defines the methods that a paginate service must implement
 * @implements {IPaginateService}
 * @template S
 * @template T
 * @description Abstract class that defines the methods that a paginate service must implement
 */

@injectable()
export default class PaginateService implements IPaginateService {
  format(iPaginationQueryDTO: IPaginationQueryDTO) {
    const page = Number(iPaginationQueryDTO?.pageNumber ? iPaginationQueryDTO.pageNumber : 1);
    const perPage = Number(iPaginationQueryDTO?.size ? iPaginationQueryDTO.size : 10);
    return { page, perPage };
  }

  paginate<T>(entities: T[], page: number, perPage: number, total: number): IPaginationResponseDTO {
    return {
      currentPage: page,
      from: (page - 1) * perPage + 1,
      to: (page - 1) * perPage + perPage,
      perPage: perPage,
      lastPage: Math.ceil(total / perPage),
      total: total,
      items: entities,
    };
  }
}
