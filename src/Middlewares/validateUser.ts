import Joi from 'joi';
import { RequestHandler } from 'express';
import Status from '../Enums/Status';

const UserJoi = Joi.object({
  username: Joi.string().min(3).required().messages({
    'string.base': 'Username must be a string',
    'any.required': 'Username is required',
    'string.min': 'Username must be longer than 2 characters',
  }),
  classe: Joi.string().min(3).required().messages({
    'string.base': 'Classe must be a string',
    'any.required': 'Classe is required',
    'string.min': 'Classe must be longer than 2 characters',
  }),
  level: Joi.number().positive().required().integer()
    .messages({
      'number.base': 'Level must be a number',
      'any.required': 'Level is required',
      'number.positive': 'Level must be greater than 0',
    }),
  password: Joi.string().min(8).required().messages({
    'string.base': 'Password must be a string',
    'any.required': 'Password is required',
    'string.min': 'Password must be longer than 7 characters',
  }),
});
 
const validateUser:RequestHandler = (req, res, next) => {
  const { body } = req;
  if (typeof (body.level) === 'string') { 
    return res.status(Status.UNPROCESSABLE_ENTITY).json({ error: 'Level must be a number' });
  }
  const validation = UserJoi.validate(body);
  if (validation.error) {
    const errorCode = validation.error.message.includes('must be') 
      ? Status.UNPROCESSABLE_ENTITY : Status.BAD_REQUEST;
    return res.status(errorCode).json({ error: validation.error.message });
  }

  next();
};

export default validateUser;
