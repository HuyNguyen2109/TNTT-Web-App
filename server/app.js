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
const BYPASS_AUTH = process.env.BYPASS_AUTH === 'true' || !!config.bypassAuth;

if (BYPASS_AUTH) {
  console.warn('[BFF] ⚠️  AUTH BYPASS ENABLED — do not use in production');
}

// ── Security ──────────────────────────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],   // Angular needs inline scripts
      styleSrc:  ["'self'", "'unsafe-inline'"],
      imgSrc:    ["'self'", 'data:'],
      upgradeInsecureRequests: null,               // Disable — server is HTTP-only
      scriptSrcAttr: null,                         // Disable — allows onclick etc.
    },
  },
  strictTransportSecurity: false,                  // Disable — no HTTPS
  crossOriginOpenerPolicy: false,                  // Disable — HTTP-only dev env
  crossOriginResourcePolicy: false,
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

// ── Passport (skipped when bypassAuth is true) ────────────────────────────────
if (!BYPASS_AUTH) {
  app.use(passport.initialize());
  app.use(passport.session());
  require('./config/passport')(passport);
}

// ── Auth guard (inlined) ──────────────────────────────────────────────────────
const ensureAuthenticated = BYPASS_AUTH
  ? (_req, _res, next) => next()
  : (req, res, next) => {
      if (req.isAuthenticated()) return next();
      res.status(401).json({ message: 'Unauthenticated' });
    };

// ── Stub API (when bypassAuth is enabled and no backend is running) ───────────
if (BYPASS_AUTH) {
  app.use('/api', (req, res, next) => {
    if (req.method === 'OPTIONS') return next();
    console.warn(`[stub] ${req.method} ${req.path}`);
    next();
  });

  // Fund entries (used by both dashboard and funds list pages)
  app.get('/api/childrenFund', (_req, res) => res.json([
    { date: '2026-06-15', amount: 5000000, note: 'Đóng góp đầu năm', type: 'income' },
    { date: '2026-06-20', amount: 2000000, note: 'Mua sách giáo lý', type: 'expense' },
    { date: '2026-06-25', amount: 3000000, note: 'Ủng hộ', type: 'income' },
    { date: '2026-06-28', amount: 1500000, note: 'Văn phòng phẩm', type: 'expense' },
    { date: '2026-06-29', amount: 1000000, note: 'Quỹ học bổng', type: 'income' },
  ]));
  app.get('/api/internalFund', (_req, res) => res.json([
    { date: '2026-06-10', amount: 3000000, note: 'Thu quỹ tháng 6', type: 'income' },
    { date: '2026-06-18', amount: 1500000, note: 'Chi phí sinh hoạt', type: 'expense' },
    { date: '2026-06-22', amount: 2000000, note: 'Đóng góp từ thiện', type: 'income' },
    { date: '2026-06-27', amount: 1000000, note: 'Sửa chữa CSVC', type: 'expense' },
    { date: '2026-06-29', amount: 1500000, note: 'Đóng góp', type: 'income' },
  ]));
  app.get('/api/user/all',      (_req, res) => res.json([
    { holyName: 'Gioan Baotixita', firstName: 'Nguyễn', lastName: 'Văn A', phone: '0901234567', email: 'vana@example.com' },
    { holyName: 'Maria',           firstName: 'Trần',   lastName: 'Thị B', phone: '0901234568', email: 'thib@example.com' },
  ]));
  app.get('/api/children/count', (_req, res) => res.json({ count: 42 }));
  app.get('/api/children/all/:page', (_req, res) => res.json([
    { holyName: 'Phêrô', firstName: 'Lê', lastName: 'Văn C', birthday: '2015-03-15', classID: 'Lớp 1A', active: true },
    { holyName: 'Anna',   firstName: 'Phạm', lastName: 'Thị D', birthday: '2016-07-22', classID: 'Lớp 2B', active: true },
    { holyName: 'Phaolô', firstName: 'Đỗ', lastName: 'Văn E', birthday: '2014-11-08', classID: 'Lớp 3C', active: false },
  ]));
  app.get('/api/class/all',        (_req, res) => res.json([]));
  app.get('/api/event/all',        (_req, res) => res.json([]));
  app.get('/api/document/all',     (_req, res) => res.json([]));
  // Funds detail (stubbed above as summary totals)
}

// ── Auth routes ───────────────────────────────────────────────────────────────
if (BYPASS_AUTH) {
  // When IdP is unavailable: stub all auth endpoints so Angular keeps working.
  app.get('/auth/login',    (_req, res) => res.redirect('/'));
  app.get('/auth/callback', (_req, res) => res.redirect('/'));
  app.get('/auth/logout',   (_req, res) => res.redirect('/'));
  app.get('/auth/user',     (_req, res) => res.json({
    user: { id: 'bypass', displayName: 'Dev User (bypass)', email: 'dev@local' },
  }));
} else {
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
}

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

