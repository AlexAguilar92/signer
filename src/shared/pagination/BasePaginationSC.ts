import Joi from 'joi';

export default Joi.object().keys({
  pageNumber: Joi.number().optional().min(1),
  size: Joi.number().optional().min(1).max(999),
  sort: Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string())),
  filter: Joi.string().optional(),
});
