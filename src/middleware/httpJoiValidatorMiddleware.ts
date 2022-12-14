import Joi from 'joi';
import HttpStatusCode from '../shared/enums/httpStatusCode';
import ErrorCode from '../shared/error/errorCode';
import Warning from '../shared/error/Warning';

/**
 * Enum for validation type
 * @readonly
 * @enum {VALIDATOR_TYPE}
 */

export enum VALIDATOR_TYPE {
  BODY = 'BODY',
  PATH = 'PATH',
  QUERY = 'QUERY',
}

/**
 * @interface IValidatorMiddleware
 * @description ValidatorMiddleware to adapt the data of validation
 * @property {Joi.ObjectSchema<any>} schema
 * @property {VALIDATOR_TYPE} type
 * @property {string} pathParam
 */

export interface IValidatorMiddleware {
  schema: Joi.ObjectSchema<any> | Joi.ArraySchema | Joi.StringSchema | Joi.NumberSchema;
  type: VALIDATOR_TYPE;
  pathParam?: string;
}

/**
 * @function httpJoiValidatorMiddleware
 * @description Middleware to validate data
 * @param {IValidatorMiddleware} validationData
 * @TODO Add option to validate multiple path params if required
 */

export const httpJoiValidatorMiddleware = (validateData: IValidatorMiddleware) => {
  const validatorMiddleware = async (request: any) => {
    try {
      // Validation for body
      if (validateData.type === VALIDATOR_TYPE['BODY']) {
        await validateData.schema.validateAsync(request.event.body);
      }

      // Validation for query
      if (validateData.type === VALIDATOR_TYPE['QUERY']) {
        await validateData.schema.validateAsync(
          request.event.queryStringParameters ? request.event.queryStringParameters : {},
        );
      }

      // Validation for path
      if (validateData.type === VALIDATOR_TYPE['PATH']) {
        await validateData.schema.validateAsync(request.event.pathParameters ? request.event.pathParameters : {});
      }
    } catch (err) {
      console.log('JOI ERR: ', err);
      throw new Warning(HttpStatusCode.BAD_REQUEST, [], [ErrorCode.ERR0008]);
    }
  };

  return {
    before: validatorMiddleware,
  };
};
