/**
 * @interface IPaginateService
 * @template T
 * @description interface that defines the methods that a paginate service must implement
 */

import IPaginationQueryDTO from '../../../dto/common/IPaginationQueryDTO';
import IPaginationResponseDTO from '../../../dto/common/IPaginationResponseDTO';

export default interface IPaginateService {
  format(iPaginationQueryDTO: IPaginationQueryDTO);
  paginate<T>(entity: T[], page: number, perPage: number, total: number): IPaginationResponseDTO;
}
