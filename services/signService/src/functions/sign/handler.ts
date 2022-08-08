import { formatJSONResponse } from '@libs/api-gateway';
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpResponseHandlerMiddleware from '../../../../../src/middleware/httpResponseHandlerMiddleware';
import {httpJoiValidatorMiddleware, VALIDATOR_TYPE} from '../../../../../src/middleware/httpJoiValidatorMiddleware'
import Sign from '../../../../schemas/Sign.schema'

const main = middy(async event => {
  console.log(event)
  return formatJSONResponse({
    message: `Hello, welcome to the exciting Serverless world!`,
    event,
  });
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
