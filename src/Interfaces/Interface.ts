// usando como base o arquivo - https://github.com/tryber/sd-014-typescript-crud-mysql/blob/master/models/User.ts
// RowDataPacket é o nome da função construtora que cria um objeto e pega dados de dentro dele

/** lembrar de separar interface user/login/product */
import { RowDataPacket } from 'mysql2';

interface User {
  username: string,
  classe: string,
  level: number,
  password: string
}

interface LoginUser {
  id: number,
  username: string,
  password: string
}

interface IProduct {
  name: string,
  amount: string,
}

interface Product extends RowDataPacket {
  name: string,
  amount: string,
  orderId: number | null;
  id: number;
}

interface IOrder {
  products: number[],
}

interface TokenInterface {
  id: number;
}

export { User, LoginUser, IProduct, Product, IOrder, TokenInterface };
