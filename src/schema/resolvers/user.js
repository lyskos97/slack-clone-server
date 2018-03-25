/* @flow */

import { hashSync } from 'bcrypt';

type CreateUserArgs = {
  username: string,
  email: string,
  password: string,
};

type GetUserArgs = {
  id: number,
};

export default {
  Query: {
    getUser: (source: mixed, { id }: GetUserArgs, { models }: Object) => {
      return models.User.findOne({ where: { id } });
    },
    users: (source: mixed, args: Object, { models }: Object) => {
      return models.User.findAll();
    },
  },
  Mutation: {
    register: (source: mixed, { password, ...otherArgs }: CreateUserArgs, { models }: Object) => {
      const hashedPassword = hashSync(password, 10);

      return models.User.create({ ...otherArgs, password: hashedPassword });
    },
  },
};
