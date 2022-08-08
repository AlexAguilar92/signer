import IPaginationQueryDTO from '../../dto/common/IPaginationQueryDTO';

/**
 * @function formatPagination
 * @param IPaginationQueryDTO
 * @description Formats the pagination query
 */

export const formatPagination = (iPaginationQueryDTO: IPaginationQueryDTO): { [keys: string]: any } => {
  const page: number = Number(iPaginationQueryDTO.pageNumber ? iPaginationQueryDTO.pageNumber : 1);
  const pageSize: number = Number(iPaginationQueryDTO.size ? iPaginationQueryDTO.size : 10);
  const status: string = String(iPaginationQueryDTO.status);
  return { page: page, perPage: pageSize, status };
};

/**
 * @function formatPaginationResponseParams
 * @param {number} totalRows
 * @param {number} actualPage
 * @param {number} pageSize
 * @description Formats the pagination response
 */

export const formatPaginationResponseParams = (totalRows: number, actualPage: number, pageSize: number) => {
  const paginationFrom = +((actualPage - 1) * pageSize + 1);
  const paginationTo = +((actualPage - 1) * pageSize + Number(pageSize));
  const paginationLastPage = +Math.ceil(totalRows / pageSize);

  return { paginationFrom, paginationTo, paginationLastPage };
};
