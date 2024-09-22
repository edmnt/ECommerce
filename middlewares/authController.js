import jwt from "jsonwebtoken";
import { _CFG } from "../app";

export const authController = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ message: 'You are not signed in. Please sign in and try again.' });
  }

  token = token.split(' ')[1];

  jwt.verify(token, _CFG.JWT_KEY,{issuer: _CFG.JWT_ISSUER}, (err, decoded) => {
    if (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired. Please sign in and try again.' });
    }
      console.log(err);
      return res.status(500).send("Server issued an error");
    }
    req.user = decoded;
    next();
  });
};