'use strict';

const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const helmet = require('helmet');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const config = require('./config/config');
const appRouter = require('./routes/appRoute');

const app = express();
const PORT = config.port || 3000;

// ── Security ──────────────────────────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],   // Angular needs inline scripts
      styleSrc:  ["'self'", "'unsafe-inline'"],
      imgSrc:    ["'self'", 'data:'],
    },
  },
}));

app.use(cors({
  origin: config.cors.origin || false,
  credentials: true,
}));

// ── Body parsing ──────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Session ───────────────────────────────────────────────────────────────────
app.use(session({
  secret: config.session.secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: (config.session.maxAgeHours || 8) * 60 * 60 * 1000,
  },
}));

// ── Passport ──────────────────────────────────────────────────────────────────
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// ── Auth guard (inlined) ──────────────────────────────────────────────────────
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: 'Unauthenticated' });
};

// ── Auth routes (public — no ensureAuthenticated) ─────────────────────────────
app.get('/auth/login', passport.authenticate('openidconnect'));

app.get(
  '/auth/callback',
  passport.authenticate('openidconnect', { failureRedirect: '/auth/login' }),
  (req, res) => res.redirect('/'),
);

app.get('/auth/logout', (req, res, next) => {
  const idToken = req.session?.idToken;

  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      const issuer = config.oidc.issuerUrl.replace(/\/$/, '');
      const postLogoutUri = encodeURIComponent(config.oidc.postLogoutRedirectUrl || '/');
      let endSessionUrl = `${issuer}/end-session/?post_logout_redirect_uri=${postLogoutUri}`;
      if (idToken) endSessionUrl += `&id_token_hint=${encodeURIComponent(idToken)}`;
      res.redirect(endSessionUrl);
    });
  });
});

app.get('/auth/user', (req, res) => {
  if (req.isAuthenticated()) return res.json({ user: req.user });
  res.status(401).json({ message: 'Unauthenticated' });
});

// ── API proxy (protected) ─────────────────────────────────────────────────────
app.use(
  '/api',
  ensureAuthenticated,
  createProxyMiddleware({
    target: config.backend.url,
    changeOrigin: true,
    on: {
      error: (err, req, res) => {
        console.error('[proxy error]', err.message);
        res.status(502).json({ message: 'Bad Gateway' });
      },
    },
  }),
);

// ── SPA: serve Angular static build from server/public/www ───────────────────
const staticDir = path.join(__dirname, config.staticDir);
app.use(express.static(staticDir));
app.use('/', appRouter);

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`[BFF] listening on port ${PORT} (${process.env.NODE_ENV || 'local'})`);
  console.log(`[BFF] serving static files from: ${staticDir}`);
});

