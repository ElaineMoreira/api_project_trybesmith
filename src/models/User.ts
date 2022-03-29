import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import { User, LoginUser } from '../Interfaces/Interface';
// consulta ao link - https://github.com/tryber/sd-014-typescript-crud-mysql/blob/master/models/User.ts

const createLogin = async (user: { username: string, password: string }):Promise<number> => {
  const { username, password } = user;
  const [data] = await connection.execute(
    'SELECT id, username, password FROM Trybesmith.Users WHERE (username = ?) AND (password = ?) ;',
    [username, password],
  );
  if (data) {
    const [row] = data as LoginUser[];
    if (row) {
      return row.id;
    }
  }
  return 0;
};

const create = async (user: User):Promise<number> => {
  const { username, classe, password, level } = user;
  const [numUser] = await connection.execute<ResultSetHeader>(
    'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?);',
    [username, classe, level, password],
  );
  const id = numUser.insertId;
  return id;
};

export { create, createLogin };
