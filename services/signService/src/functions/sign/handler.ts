import { formatJSONResponse } from '@libs/api-gateway';
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpResponseHandlerMiddleware from '../../../../../src/middleware/httpResponseHandlerMiddleware';
import {httpJoiValidatorMiddleware, VALIDATOR_TYPE} from '../../../../../src/middleware/httpJoiValidatorMiddleware'
import Sign from '../../../../schemas/Sign.schema'
import HttpStatusCode from '../../../../../src/shared/enums/httpStatusCode';

const main = middy(async event => {
  // console.log("event", event)
  // return {data: 1, statusCode: HttpStatusCode.CREATED}
  return formatJSONResponse(
      '1',
      HttpStatusCode.CREATED
  );
});

main
  .use(httpResponseHandlerMiddleware())
  .use(httpJsonBodyParser())
  .use(
    httpJoiValidatorMiddleware({
      schema: Sign,
      type: VALIDATOR_TYPE.BODY,
    })
  );

module.exports = {
  main
}