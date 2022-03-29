import express, { Request, Response } from 'express';
import Status from './Enums/Status';
/** importa middlewares */
import validateUser from './Middlewares/validateUser';
import validateLogin from './Middlewares/validateLogin';
import validateProduct from './Middlewares/validateProduct';
import generateToken from './Middlewares/GenerateToken';
import validateToken from './Middlewares/validateToken';
/** importa models */
import { create, createLogin } from './models/User';
import { createProduct, getAllProducts } from './models/Product';

const app = express();

app.use(express.json());

/** endpoint para o cadastro de pessoas usuárias */
app.post('/users', validateUser, async (req: Request, res: Response) => {
  const { username } = req.body;
  const id = await create(req.body);
  const token = generateToken({ id, username });
  res.status(Status.CREATED).json({ token });
});
/** endpoint para o login de pessoas usuárias */
app.post('/login', validateLogin, async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const id = await createLogin({ username, password });
  if (!id) {
    return res.status(Status.UNAUTHORIZED).json({ error: 'Username or password invalid' });
  }
  const token = generateToken({ id, username });
  res.status(Status.OK).json({ token });
});
/** Crie um endpoint para o cadastro de produtos */
app.post('/products', validateToken, validateProduct, async (req: Request, res: Response) => {
  const { name, amount } = req.body;
  const id = await createProduct({ name, amount });
  res.status(Status.CREATED).json({
    item: {
      id,
      name,
      amount,
    },
  });
});
/** endpoint para a listagem de produtos */
app.get('/products', validateToken, async (req: Request, res: Response) => {
  const products = await getAllProducts();
  res.status(Status.OK).json(products);
});
/**  endpoint para o cadastro de um pedido */

export default app;
