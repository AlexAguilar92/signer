import ErrorCode from '../../shared/error/errorCode';
import Exception from '../../shared/error/Exception';
import HttpStatusCode from '../../shared/enums/httpStatusCode';

export const getPaginationFromQuery = (query: Object) => {
  let result = {};

  if ('size' in query) {
    result['take'] = query['size'];

    if (parseInt(query['size']) < 1) {
      throw new Exception(HttpStatusCode.BAD_REQUEST, ErrorCode.ERR1400, []);
    }

    if ('pageNumber' in query) {
      if (parseInt(query['pageNumber']) < 1) {
        throw new Exception(HttpStatusCode.BAD_REQUEST, ErrorCode.ERR1400, []);
      }

      result['skip'] = (parseInt(query['pageNumber']) - 1) * parseInt(query['size']);
    }
  }

  return result;
};
