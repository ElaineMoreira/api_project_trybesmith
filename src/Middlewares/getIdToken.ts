import jwt from 'jsonwebtoken';
import { TokenInterface } from '../Interfaces/Interface';

/** funcao para token */
function getIdToken(token:string) {
  const { id } = jwt.verify(token, 'SECRET') as TokenInterface;
  return id;
}

export default getIdToken;
