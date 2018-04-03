/* @flow */

// $FlowFixMe
import express, { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import graphqlHTTP from 'express-graphql';
import models from './models';
import schema from './schema';
import secrets from '../private/jwt';
import { refreshTokens } from './schema/utils';

const PORT = process.env.PORT || 4000;
const app = express();
const { secret, refreshSecret } = secrets;

const addUser = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-token'];

  console.log('headers', req.headers);

  if (token) {
    try {
      const payload = jwt.verify(token, secret);

      if (typeof payload === 'object' && payload && payload.user) {
        const { user } = payload || {};
        req.user = user;
      }
    } catch (e) {
      const refreshToken = req.headers['x-refresh-token'];
      const newTokens = await refreshTokens({ token, refreshToken }, models, secrets);

      if (newTokens.token && newTokens.refreshToken) {
        res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
        res.set('x-token', newTokens.token);
        res.set('x-token', newTokens.refreshToken);
      }
      req.user = newTokens.user;
    }
  }
  next();
};

app.use(
  '/',
  cors(),
  graphqlHTTP({
    schema,
    graphiql: true,
    context: {
      models,
      SECRET: secret,
      SECRET2: refreshSecret,
    },
  })
);

models.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log('\x1b[32m', 'GraphQL on port', PORT));
});
