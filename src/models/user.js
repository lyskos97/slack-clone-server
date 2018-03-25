/* @flow */

// $FlowFixMe
import { type Sequelize, type DataTypes, type Models } from 'sequelize';

export default (sequelize: Sequelize, dataTypes: DataTypes) => {
  const User = sequelize.define('users', {
    username: {
      type: dataTypes.STRING,
      unique: true,
      validate: {
        isAlphanumeric: {
          msg: 'The username can contain only letters and numbers',
        },
        len: {
          msg: 'The username must be at least 3 characters long and 25 at most',
          args: [3, 25],
        },
      },
    },
    email: {
      type: dataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Invalid email',
        },
      },
    },
    password: {
      type: dataTypes.STRING,
    },
  });

  User.associate = (models: Models) => {
    User.belongsToMany(models.Team, {
      through: 'member',
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      },
    });
    User.belongsToMany(models.Channel, {
      through: 'channel_member',
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      },
    });
  };

  return User;
};
