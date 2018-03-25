/* @flow */

import express from 'express';
import cors from 'cors';
import graphqlHTTP from 'express-graphql';
import models from './models';
import schema from './schema';

const PORT = process.env.PORT || 4000;
const app = express();

app.use(
  '/',
  cors(),
  graphqlHTTP({
    schema,
    graphiql: true,
    context: {
      models,
    },
  })
);

models.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log('\x1b[32m', 'GraphQL on port', PORT));
});
