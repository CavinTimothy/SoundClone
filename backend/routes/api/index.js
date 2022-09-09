const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

// ***TEST setTokenCookie*** (Gets demo user and calling setTokenCookie)
// GET http://localhost:8000/api/set-token-cookie
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user });
});
// OUTPUT: 'token' cookie is set in DevTools

// ***TEST restoreUser*** (Checks if req.user is properly populated)
// 1) RESET TOKEN: http://localhost:8000/api/set-token-cookie
// 2) GET http://localhost:8000/api/restore-user
// 3) DELETE 'token' COOKIE -> REFRESH
const { restoreUser } = require('../../utils/auth.js');
router.use(restoreUser);
router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);
// OUTPUT: JSON response is empty(NULL)

// ***TEST requireAuth*** (Checks for session user)
// 1) RESET TOKEN: http://localhost:8000/api/set-token-cookie
// 2) GET http://localhost:8000/api/require-auth
// 3) DELETE 'token' COOKIE -> REFRESH
const { requireAuth } = require('../../utils/auth.js');
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);
// OUTPUT: "Unauthorized" error response

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

// ***TEST API ROUTER***
// 1) http://localhost:8000/api/csrf/restore
// 2) ENTER INTO DevTools CONSOLE:
//   fetch('/api/test', {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
//     },
//     body: JSON.stringify({ hello: 'world' });
// }).then(res => res.json()).then(data => console.log(data));
// 3) REPLACE <value of XSRF-TOKEN cookie> WITH 'XSRF-Token' COOKIE VALUE IN DevTools
router.post('/test', function (req, res) {
  res.json({ requestBody: req.body });
});
// OUTPUT: No errors, printed request body

module.exports = router;
