/* @flow */

type GetChannelArgs = {
  id: number,
};

type CreateChannelArgs = {
  name: string,
  public: boolean,
};

export default {
  Query: {
    getChannel: (source: mixed, { id }: GetChannelArgs, { models }: Object) => {
      return models.Channel.findOne({ where: { id } });
    },
    channels: (source: mixed, args: Object, { models }: Object) => {
      return models.Channel.findAll();
    },
  },
  Mutation: {
    createChannel: (source: mixed, args: CreateChannelArgs, { models }: Object) => {
      return models.Channel.create(args);
    },
  },
};
