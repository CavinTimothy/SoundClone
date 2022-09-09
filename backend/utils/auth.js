const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

// ***SEND JWT COOKIE*** (For login and signup routes)
// Takes in the response and the session user and generates a JWT using the imported secret.
// Set to expire using JWT_EXPIRES_IN key in the .env file.
// Payload of JWT will be the return of instance method .toSafeObject in User model.
// After JWT is created, set to an HTTP-only cookie on the response as a token cookie.
const setTokenCookie = (res, user) => {
  // Create token.
  const token = jwt.sign(
    { data: user.toSafeObject() },
    secret,
    { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
  );

  const isProduction = process.env.NODE_ENV === "production";

  // Set token cookie
  res.cookie('token', token, {
    maxAge: expiresIn * 1000, // maxAge in milliseconds
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax"
  });

  return token;
};

// ***RESTORE SESSION USER*** (Checks if there is a current user logged in or not)
// Verifies and parses JWT's payload and search the database for a User with the id in the payload.
// If there User is found, save the user to a key of user onto req.user.
// If there is an error verifying the JWT or User cannot be found with the id,
// clear the token cookie from the response and set req.user to null.
const restoreUser = (req, res, next) => {
  // token parsed from cookies
  const { token } = req.cookies;
  req.user = null;

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      return next();
    }

    try {
      const { id } = jwtPayload.data;
      req.user = await User.scope('currentUser').findByPk(id);
    } catch (e) {
      res.clearCookie('token');
      return next();
    }

    if (!req.user) res.clearCookie('token');

    return next();
  });
};

// ***USER AUTHENTICATION*** (Checks user's route authorization)
// Checks req.user and will go to the next middleware if there is a session user present.
// If there is no session user, an error will be created and passed along to
// the error-handling middlewares.
const requireAuth = function (req, _res, next) {
  if (req.user) return next();

  const err = new Error('Unauthorized');
  err.title = 'Unauthorized';
  err.errors = ['Unauthorized'];
  err.status = 401;
  return next(err);
};

module.exports = { setTokenCookie, restoreUser, requireAuth };
