/* @flow */

export default `
  type Message {
    id: Int!
    text: String!
    user: User!
    channel: Channel!
  }

  type Query {
    getMessage(id: Int!): Message!
    messages: [Message!]
  }

  type Mutation {
    createMessage(text: String!, userId: Int!, channelId: Int!): Message!
  }
`;
