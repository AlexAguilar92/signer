import Joi from 'joi'

export default Joi.object().keys({
  overrideMinimumRequiredLevel: Joi.object().required(),
  fact: Joi.object().required(),
  pipeline: Joi.object().required(),
  template: Joi.object().required()
}).required()