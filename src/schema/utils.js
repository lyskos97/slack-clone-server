/* @flow */

// $FlowFixMe
import { type Model, type SequelizeStatic } from 'sequelize';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

type Models = { [key: string]: Model<any, any>, sequelize: SequelizeStatic };

export type Context = { models: Models, SECRET: string, SECRET2: string };

type Tokens = {
  token: string,
  refreshToken: string,
};

type Secrets = {
  secret: string,
  refreshSecret: string,
};

export const formatErrors = (e: { errors: Array<Error> }, models: Models) => {
  if (e instanceof models.sequelize.ValidationError) {
    return e.errors.map(err => {
      const { path, message } = err;

      return { path, message };
    });
  }

  return [{ path: 'name', message: 'Oops, something went wrong!' }];
};

// ------------------AUTH----------------- //

export const createTokens = (user: Object, secret: string, secret2: string) => {
  const { id } = user;
  const createToken = jwt.sign({ user: { id } }, secret, { expiresIn: '1h' });
  const createRefreshToken = jwt.sign({ user: { id } }, secret2, { expiresIn: '7d' });

  return [createToken, createRefreshToken];
};

export const refreshTokens = async (tokens: Tokens, models: Models, secrets: Secrets) => {
  const { refreshToken } = tokens;
  const { secret, refreshSecret } = secrets;
  let userId = 0;
  let tokensAndUser = { token: null, refreshToken: null, user: null };

  try {
    const payload = jwt.decode(refreshToken);

    // gross example of getting Flow satisfied
    if (payload && typeof payload === 'object' && payload.user && typeof payload.user === 'object')
      userId = payload.user.id;
  } catch (err) {
    return tokensAndUser;
  }

  if (!userId) return tokensAndUser;

  // $FlowFixMe
  const user = await models.User.findOne({ where: { id: userId }, raw: true });

  if (!user) return tokensAndUser;

  const newRefreshSecret = user.password + refreshSecret; // token expires if password gets changed

  try {
    jwt.verify(refreshToken, user.newRefreshSecret);
  } catch (err) {
    return tokensAndUser;
  }

  const [newToken, newRefreshToken] = createTokens(user, secret, newRefreshSecret);

  tokensAndUser = {
    token: newToken,
    refreshToken: newRefreshToken,
    user,
  };

  return tokensAndUser;
};

export const tryLogin = async (
  email: string,
  password: string,
  models: Models,
  SECRET: string,
  SECRET2: string
) => {
  // $FlowFixMe
  const user = await models.User.findOne({ where: { email }, raw: true });
  if (!user) {
    return {
      success: false,
      errors: [{ path: 'email', message: 'Invalid email' }],
    };
  }

  // check password
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return {
      success: false,
      errors: [{ path: 'password', message: 'Invalid password' }],
    };
  }

  const refreshTokenSecret = user.password + SECRET2;

  const [token, refreshToken] = await createTokens(user, SECRET, refreshTokenSecret);

  return {
    success: true,
    token,
    refreshToken,
  };
};
