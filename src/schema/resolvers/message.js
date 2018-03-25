/* @flow */

type GetMessageArgs = {
  id: number,
};

type CreateMessageArgs = {
  text: string,
};

export default {
  Query: {
    getMessage: (source: mixed, { id }: GetMessageArgs, { models }: Object) => {
      return models.Message.findOne({ where: { id } });
    },
    messages: (source: mixed, args: Object, { models }: Object) => {
      return models.Message.findAll();
    },
  },
  Mutation: {
    createMessage: (source: mixed, args: CreateMessageArgs, { models }: Object) => {
      return models.Message.create(args);
    },
  },
};
