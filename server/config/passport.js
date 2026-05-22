'use strict';

const OidcStrategy = require('passport-openidconnect');
const config = require('./config');

module.exports = (passport) => {
  const { issuerUrl, clientId, clientSecret, callbackUrl } = config.oidc;

  passport.use(
    new OidcStrategy(
      {
        issuer:           issuerUrl,
        authorizationURL: `${issuerUrl}authorize/`,
        tokenURL:         `${issuerUrl}token/`,
        userInfoURL:      `${issuerUrl}userinfo/`,
        clientID:         clientId,
        clientSecret:     clientSecret,
        callbackURL:      callbackUrl,
        scope:            'openid profile email',
      },
      (issuer, profile, done) => done(null, profile),
    ),
  );

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));
};
