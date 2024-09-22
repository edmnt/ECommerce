import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const _CFG = Object.freeze({JWT_KEY: process.env.JWT_KEY, JWT_ISSUER: process.env.JWT_ISSUER});

export const authController = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ message: 'Unauthorized.' });
  }
  
  token = token.split(' ')[1];

  jwt.verify(token, _CFG.JWT_KEY,{issuer: _CFG.JWT_ISSUER}, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};