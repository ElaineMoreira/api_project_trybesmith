import { ResultSetHeader } from 'mysql2';
import connection from './connection';

const createOrder = async (userId:number, products: number[]):Promise<number> => {
  const [numOrder] = await connection.execute<ResultSetHeader>(
    'INSERT INTO Trybesmith.Orders (userId) VALUES (?);',
    [userId],
  );
  const id = numOrder.insertId;
  await connection.query(
    'UPDATE Trybesmith.Products SET orderId = ? WHERE id IN (?);',
    [id, products],
  );
  return id;
};

export default createOrder;
