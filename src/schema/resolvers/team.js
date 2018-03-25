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
    createTeam: (source: mixed, args: CreateTeamArgs, { models }: Object) => {
      return models.Team.create(args);
    },
  },
};
