import 'reflect-metadata';
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpResponseHandlerMiddleware from '../../../../../src/middleware/httpResponseHandlerMiddleware';
import httpRequestHandlerMiddleware from '../../../../../src/middleware/httpRequestHandlerMiddleware';
import {httpJoiValidatorMiddleware, VALIDATOR_TYPE} from '../../../../../src/middleware/httpJoiValidatorMiddleware'
import HttpStatusCode from '../../../../../src/shared/enums/httpStatusCode';
import Registration from '../../../../../src/schemas/Registration.schema'
import container from './inversify.config';
import Adapter from '../../../../../src/modules/common/adapter/Adapter';
import SignCreateAdapterParams from '../../../../../src/modules/register/domain/DTO/SignCreateAdapterParams.dto';
import TYPES from '../../../../../src/types';
import { formatJSONResponse } from '../../libs/api-gateway';

const main = middy(async event => {
  const adapter: Adapter<SignCreateAdapterParams, string> = container.get<Adapter<SignCreateAdapterParams, string>>(TYPES.SignCreateAdapter);
  const response = await adapter.execute({...event.body, user: event.user});
  return formatJSONResponse(
      response,
      HttpStatusCode.CREATED
  );
});

main
  .use(httpRequestHandlerMiddleware())
  .use(httpResponseHandlerMiddleware())
  .use(httpJsonBodyParser())
  .use(
    httpJoiValidatorMiddleware({
      schema: Registration,
      type: VALIDATOR_TYPE.BODY,
    })
  );

module.exports = {
  main
}