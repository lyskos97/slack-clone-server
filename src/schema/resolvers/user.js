/* @flow */

import { formatErrors, tryLogin, type Context } from '../utils';

type RegisterArgs = {
  username: string,
  email: string,
  password: string,
};

type LoginArgs = {
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
    login: (
      source: mixed,
      { email, password }: LoginArgs,
      { models, SECRET, SECRET2 }: Context
    ) => {
      return tryLogin(email, password, models, SECRET, SECRET2);
    },
    register: async (source: mixed, args: RegisterArgs, { models }: Object) => {
      try {
        if (args.password.length > 5 && args.password.length < 100) {
          const message = 'The password must be between 5 and 100 characters long';
          return {
            success: false,
            errors: [{ path: 'password', message }],
          };
        }

        const user = await models.User.create(args);

        return {
          success: true,
          user,
        };
      } catch (e) {
        return {
          success: false,
          errors: formatErrors(e, models),
        };
      }
    },
  },
};
