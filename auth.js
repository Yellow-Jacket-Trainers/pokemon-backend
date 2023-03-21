'use strict';

// install: npm i jsonwebtoken
// install: npm i jwks-rsa

const jwt = require ('jsonwebtoken');
const jwksClient = require ('jwks-rsa');

// =============== HELPER METHODS, pulled from the jsonwebtoken documentation =================== //
//                 https://www.npmjs.com/package/jsonwebtoken                                     //

// Define a client, this is a connection to YOUR auth0 account, using the URL given in your dashboard
function verifyUser(request, response, next) {

  function valid(err, user) {
    request.user = user;
    next();
  }

  if (request.method === 'OPTIONS'){
    console.log('preflight request, no auth action needed');
    return;
  }
  try {
    const token = request.headers.authorization.split(' ')[1];
    jwt.verify(token, getKey, {}, valid);
  } catch (error) {
    next(error);
  }
}


// =============== HELPER METHODS, pulled from the jsonwebtoken documentation =================== //
//                 https://www.npmjs.com/package/jsonwebtoken                                     //

// Define a client, this is a connection to YOUR auth0 account, using the URL given in your dashboard
const client = jwksClient({
  // this url comes from your app on the auth0 dashboard
  jwksUri: process.env.JWKS_URI,
});

// Match the JWT's key to your Auth0 Account Key so we can validate it
function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

module.exports = verifyUser;
