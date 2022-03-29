import { RequestHandler } from 'express';
import Joi from 'joi';
import Status from '../Enums/Status';

const productJoi = Joi.object({
  name: Joi.string().min(3).required().messages({
    'string.base': 'Name must be a string',
    'any.required': 'Name is required',
    'string.min': 'Name must be longer than 2 characters',
  }),
  amount: Joi.string().min(3).required().messages({
    'string.base': 'Amount must be a string',
    'any.required': 'Amount is required',
    'string.min': 'Amount must be longer than 2 characters',
  }),
});

const validateProduct:RequestHandler = (req, res, next) => {
  const { body } = req;
  const validation = productJoi.validate(body);
  if (validation.error) {
    const errorCode = validation.error.message.includes('must be') 
      ? Status.UNPROCESSABLE_ENTITY : Status.BAD_REQUEST;
    return res.status(errorCode).json({ error: validation.error.message });
  }

  next();
};

export default validateProduct;
