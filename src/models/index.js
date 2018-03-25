/* @flow */

// $FlowFixMe
import Sequelize, { type Models } from 'sequelize';
import { postres } from '../../private/db';

const { name, password, user } = postres;

const sequelize = new Sequelize(name, user, password, {
  dialect: 'postgres',
  define: {
    underscored: true,
    underscoredAll: true,
  },
});

const models: Models = {
  User: sequelize.import('./user'),
  Channel: sequelize.import('./channel'),
  Team: sequelize.import('./team'),
  Message: sequelize.import('./message'),
};

for (const modelName in models) {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
}

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
