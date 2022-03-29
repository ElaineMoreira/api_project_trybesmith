import Joi from 'joi';
import { RequestHandler } from 'express';
import Status from '../Enums/Status';
import { createLogin } from '../models/User';
import { LoginUser } from '../Interfaces/Interface';

const loginJoi = Joi.object({
  username: Joi.string().min(3).required().messages({
    'any.required': 'Username is required',
  }),
  password: Joi.string().min(8).required().messages({
    'any.required': 'Password is required',
  }),
});

const testLogin = async (data:LoginUser):Promise<number> => {
  const content: number = await createLogin(data);
  return content || 0;
};

const validateLogin:RequestHandler = async (req, res, next) => {
  const { body } = req;
  const validation = loginJoi.validate(body);
  if (validation.error) {
    return res.status(Status.BAD_REQUEST).json({ error: validation.error.message });
  }
  const id = await testLogin(body);
  if (!id) {
    return res.status(Status.UNAUTHORIZED).json({ error: 'Username or password invalid' });
  }

  next();
};

export default validateLogin;
