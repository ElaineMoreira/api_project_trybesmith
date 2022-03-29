import jwt from 'jsonwebtoken';

type Input = {
  id: number;
  username: string;
};

const secret = 'SECRET';

function generateToken(payload:Input):string {
  const token = jwt.sign(payload, secret);
  return token;
}

export default generateToken;