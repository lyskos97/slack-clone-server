/* @flow */

// $FlowFixMe
import { type Sequelize, type DataTypes, type Models } from 'sequelize';

export default (sequelize: Sequelize, dataTypes: DataTypes) => {
  const Message = sequelize.define('messages', {
    text: dataTypes.STRING,
  });

  Message.associate = (models: Models) => {
    Message.belongsTo(models.User, {
      foreignKey: {
        name: 'messageId',
        field: 'message_id',
        allowNull: false,
      },
    });
    Message.belongsTo(models.Channel, {
      foreignKey: {
        name: 'messageId',
        field: 'message_id',
        allowNull: false,
      },
    });
  };

  return Message;
};
