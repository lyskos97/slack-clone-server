import { type Context, formatErrors } from '../utils';

/* @flow */

type GetTeamArgs = {
  id: number,
};

type CreateTeamArgs = {
  name: string,
};

export default {
  Query: {
    getTeam: (source: mixed, { id }: GetTeamArgs, { models }: Object) => {
      return models.Team.findOne({ where: { id } });
    },
    teams: (source: mixed, args: Object, { models }: Object) => {
      return models.Team.findAll();
    },
  },
  Mutation: {
    createTeam: async (source: mixed, args: CreateTeamArgs, { models, user }: Context) => {
      try {
        const team = await models.Team.create({ ...args, owner: user.id });

        return { success: true, team };
      } catch (e) {
        return { success: false, errors: formatErrors(e) };
      }
    },
  },
};
