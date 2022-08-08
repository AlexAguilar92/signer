import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const bye = async (event) => {
  return formatJSONResponse({
    message: `Hello, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(bye);
