/* @flow */

// $FlowFixMe
import { type Sequelize, type DataTypes, type Models } from 'sequelize';

export default (sequelize: Sequelize, dataTypes: DataTypes) => {
  const Team = sequelize.define('teams', {
    name: {
      type: dataTypes.STRING,
      unique: true,
    },
  });

  Team.associate = (models: Models) => {
    Team.belongsToMany(models.User, {
      through: 'member',
      foreignKey: {
        name: 'teamId',
        field: 'team_id',
      },
    });
    Team.belongsTo(models.User, {
      foreignKey: {
        name: 'owner',
        allowNull: false,
      },
    });
  };

  return Team;
};
