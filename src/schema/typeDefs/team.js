/* @flow */

export default `
  type Team {
    id: Int!
    name: String!
    owner: User!
    members: [User!]!
  }

  type Query {
    getTeam(id: Int!): Team!
    teams: [Team!]
  }

  type CreateTeamResponse {
    success: Boolean!
    team: Team
    errors: [Error!]
  }

  type Mutation {
    createTeam(name: String!): CreateTeamResponse!
  }
`;
