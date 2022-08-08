import HttpStatusCode from '../enums/httpStatusCode';

/**
 * @interface ICustomResponseDTO
 * @description ICustomResponse DTO to adapt the data of a custom response
 * version 1.0.0
 * @property {any} data
 * @property {HttpStatusCode} statusCode
 */

export default interface ICustomResponseDTO {
  data: any;
  statusCode: HttpStatusCode;
}
