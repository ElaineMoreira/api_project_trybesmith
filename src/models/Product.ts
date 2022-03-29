import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import { IProduct, Product } from '../Interfaces/Interface';

const createProduct = async (product: IProduct):Promise<number> => {
  const { name, amount } = product;
  const [numProd] = await connection.execute<ResultSetHeader>(
    'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?);',
    [name, amount],
  );
  const id = numProd.insertId;
  return id;
};

const getAllProducts = async ():Promise<Product[]> => {
  const [content] = await connection.execute<Product[]>(
    'SELECT id, name, amount, orderId FROM Trybesmith.Products;',
  );
  return content;
};

export { createProduct, getAllProducts };
