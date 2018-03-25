/* @flow */

// $FlowFixMe
import { type Sequelize, type DataTypes, type Models } from 'sequelize';

export default (sequelize: Sequelize, dataTypes: DataTypes) => {
  const Channel = sequelize.define('channels', {
    name: dataTypes.STRING,
    public: {
      type: dataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Channel.associate = (models: Models) => {
    Channel.belongsTo(models.Team, {
      foreignKey: {
        name: 'channelId',
        field: 'channel_id',
        allowNull: false,
      },
    });
  };

  return Channel;
};
