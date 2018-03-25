/* @flow */

export default `
  type Channel {
    id: Int!
    name: String!
    messages: [Message]
    public: Boolean!
    users: [User!]!
  }

  type Query {
    getChannel(id: Int!): Team!
    channels: [Channel!]
  }

  type Mutation {
    createChannel(name: String!, teamId: Int!, public: Boolean): Channel!
  }
`;
