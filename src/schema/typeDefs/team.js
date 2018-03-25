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

  type Mutation {
    createTeam(name: String!, owner: Int!): Team!
  }
`;
