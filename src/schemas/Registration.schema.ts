import Joi from 'joi'

export default Joi.object().keys({
  id: Joi.string().optional(),
  overrideMinimumRequiredLevel: Joi.string().required(),
  fact: Joi.object().required(),
  pipeline: Joi.string().required(),
  overrides: Joi.object().required(),
  application: Joi.string().required(),
}).required()