/* @flow */

// $FlowFixMe
import { type Sequelize, type DataTypes, type Models } from 'sequelize';
import bcrypt from 'bcrypt';

export default (sequelize: Sequelize, dataTypes: DataTypes) => {
  const User = sequelize.define(
    'users',
    {
      username: {
        type: dataTypes.STRING,
        unique: true,
        validate: {
          isAlphanumeric: {
            msg: 'The username can contain only letters and numbers',
          },
          len: {
            msg: 'The username must be between 3 and 35 characters long',
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
        validate: {
          len: {
            msg: 'The password must be between 3 and 35 characters long',
            args: [3, 25],
          },
        },
      },
    },
    {
      hooks: {
        afterValidate: (user: Object) => {
          // eslint-disable-next-line no-param-reassign
          user.password = bcrypt.hashSync(user.password, 12);
        },
      },
    }
  );

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
