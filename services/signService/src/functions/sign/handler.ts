import { formatJSONResponse } from '@libs/api-gateway';
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpResponseHandlerMiddleware from '../../../../../src/middleware/httpResponseHandlerMiddleware';
import {httpJoiValidatorMiddleware, VALIDATOR_TYPE} from '../../../../../src/middleware/httpJoiValidatorMiddleware'
import Sign from '../../../../schemas/Sign.schema'
import HttpStatusCode from '../../../../../src/shared/enums/httpStatusCode';
import container from 'src/inversify.config';
import Adapter from '../../../../../src/modules/common/adapter/Adapter';
import SignCreateAdapterParams from '../../../../../src/modules/sign/domain/DTO/SignCreateAdapterParams.dto';
import TYPES from '../../../../../src/types';

const main = middy(async event => {
  const adapter: Adapter<SignCreateAdapterParams, string> = container.get<Adapter<SignCreateAdapterParams, string>>(TYPES.SignCreateAdapter);
  adapter.execute(event.body);
  // adapter.try()
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