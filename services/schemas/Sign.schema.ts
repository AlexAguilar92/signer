import Joi from 'joi'

export default Joi.object().keys({
  overrideMinimumRequiredLevel: Joi.string().required(),
  fact: Joi.object().required(),
  pipeline: Joi.string().required(),
  template: Joi.string().required()
}).required()