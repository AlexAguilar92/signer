import Joi from 'joi';
import { utcDate } from './utc';

/**
 * @function previousDaysNotAllowed
 * @description Function that
 * returns {Promise<Deposit[]>}
 * @version 1.0.0
 * summary: Get all deposits
 * @param event
 */

const previousDaysNotAllowed = (value, helper): boolean | any => {
  // Get server date and set time to 0
  const serverDate = new Date();
  serverDate.setHours(0);
  serverDate.setMinutes(0);
  serverDate.setSeconds(0);
  serverDate.setMilliseconds(0);
  const serverDateUTC = utcDate(serverDate);

  // Format value date
  const validationDate = new Date(value);

  if (validationDate < serverDateUTC) {
    return helper.message('date');
  } else {
    return true;
  }
};

const uuidStringSC: Joi.StringSchema = Joi.string().required().uuid();

const generalUUIDSC = Joi.object().keys({
  id: Joi.string().required().uuid(),
});

const generalTokenSC = Joi.object().keys({
  token: Joi.string().required(),
});

export { previousDaysNotAllowed, uuidStringSC, generalUUIDSC, generalTokenSC };
