export default `
  type User {
    id: Int!
    email: String!
    username: String!
    teams: [Team!]
    password: String!
  }

  type Query {
    getUser(id: Int!): User!
    users: [User!]
  }

  type RegisterResponse {
    success: Boolean!
    user: User
    errors: [Error!]
  }

  type LoginResponse {
    success: Boolean!
    token: String
    refreshToken: String
    errors: [Error!]
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): RegisterResponse!
    login(email: String!, password: String!): LoginResponse!
  }
`;
