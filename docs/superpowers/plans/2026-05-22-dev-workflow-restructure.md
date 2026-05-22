# Dev Workflow Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Consolidate the Angular + BFF monorepo so `ng build --watch` serves static assets through the BFF on port 3000 for all environments, remove the ng-serve proxy dev path, standardise per-environment Dockerfiles, move tsconfigs into `src/`, and verify the whole stack compiles clean.

**Architecture:** Angular always builds static files into `server/public/www/`; the BFF always serves them with `express.static` + `appRoute.js` regardless of `NODE_ENV`. Local dev uses `ng build --watch` + `nodemon server/app.js` concurrently; there is no separate `ng serve` port. Per-environment `Dockerfile.[ENV]` files replace the multi-stage `Dockerfile`; `docker-compose.yml` is removed.

**Tech Stack:** Angular 21 (`@angular/build:application`), Express 4 (BFF), PrimeNG, TypeScript 5, vitest, rimraf, nodemon.

---

## File Map

| Action | File | Reason |
|--------|------|--------|
| RENAME | `server/server.js` → `server/app.js` | Scripts reference `server/app.js` |
| MODIFY | `angular.json` | Set `outputPath` to `server/public/www`, update tsconfig refs |
| MODIFY | `package.json` | Replace scripts; add rimraf + nodemon to devDeps |
| DELETE | `proxy.conf.json` | Removed in favour of static-only dev workflow |
| MOVE | `tsconfig.app.json` → `src/tsconfig.app.json` | Per spec |
| MOVE | `tsconfig.spec.json` → `src/tsconfig.spec.json` | Per spec |
| MODIFY | `tsconfig.json` | Update project references to `src/` paths |
| DELETE | `docker-compose.yml` | Replaced by Dockerfile.[ENV] |
| DELETE | `Dockerfile` | Replaced by Dockerfile.[ENV] |
| CREATE | `Dockerfile.local` | NODE_ENV=local |
| CREATE | `Dockerfile.dev` | NODE_ENV=dev |
| CREATE | `Dockerfile.qa` | NODE_ENV=qa |
| CREATE | `Dockerfile.prod` | NODE_ENV=production |
| MODIFY | `server/app.js` | Remove ngDevProxy branch; always serve static |
| MODIFY | `server/config/config.example.json` | Remove ngDevServer key |
| RENAME | `server/config/config.development.json` → `server/config/config.dev.json` | ENV name alignment |
| CREATE | `server/config/config.local.json` | New local env |
| CREATE | `server/config/config.qa.json` | New QA env |
| MODIFY | `server/config/config.production.json` | Remove ngDevServer key |
| MODIFY | `.gitignore` | Update config filenames |
| MODIFY | `.github/copilot-instructions.md` | Update build/run section |

---

## Task 1: Rename server entry point

**Files:**
- Rename: `server/server.js` → `server/app.js`

- [ ] **Step 1: Rename the file**

```bash
mv /root/workspace/tntt-app-frontend/server/server.js /root/workspace/tntt-app-frontend/server/app.js
```

- [ ] **Step 2: Verify syntax still passes**

```bash
node --check server/app.js
```
Expected: no output (clean)

- [ ] **Step 3: Commit**

```bash
git add server/app.js server/server.js
git commit -m "refactor: rename server.js → app.js"
```

---

## Task 2: Update Angular output path

**Files:**
- Modify: `angular.json` (build → options → outputPath)

The `@angular/build:application` builder accepts an object `outputPath` where `"browser": ""` flattens output directly into `base`, avoiding a `browser/` subdirectory. This matches `staticDir: "public/www"` in the BFF config.

- [ ] **Step 1: Update angular.json outputPath**

In `angular.json`, under `projects["angular-client"].architect.build.options`, add/replace:

```json
"outputPath": {
  "base": "server/public/www",
  "browser": ""
},
```

Full resulting `options` block:

```json
"options": {
  "outputPath": {
    "base": "server/public/www",
    "browser": ""
  },
  "browser": "src/main.ts",
  "tsConfig": "src/tsconfig.app.json",
  "inlineStyleLanguage": "scss",
  "assets": [
    {
      "glob": "**/*",
      "input": "public"
    }
  ],
  "styles": [
    "src/styles.scss"
  ]
}
```

Note: `tsConfig` path is changed to `src/tsconfig.app.json` here (also required by Task 3).

- [ ] **Step 2: Update serve configuration targets**

In `angular.json` under `serve.configurations`, make sure `buildTarget` still references `angular-client:build:*` (unchanged).

- [ ] **Step 3: Commit**

```bash
git add angular.json
git commit -m "build: set Angular output to server/public/www"
```

---

## Task 3: Move tsconfig.app.json and tsconfig.spec.json into src/

**Files:**
- Create: `src/tsconfig.app.json`
- Create: `src/tsconfig.spec.json`
- Modify: `tsconfig.json`
- Delete: `tsconfig.app.json` (root)
- Delete: `tsconfig.spec.json` (root)

- [ ] **Step 1: Create src/tsconfig.app.json**

```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "outDir": "../out-tsc/app",
    "types": []
  },
  "include": [
    "**/*.ts"
  ],
  "exclude": [
    "**/*.spec.ts"
  ]
}
```

Note: `include` is `**/*.ts` (relative to `src/`); `extends` is `../tsconfig.json`.

- [ ] **Step 2: Create src/tsconfig.spec.json**

```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "outDir": "../out-tsc/spec",
    "types": [
      "vitest/globals"
    ]
  },
  "include": [
    "**/*.d.ts",
    "**/*.spec.ts"
  ]
}
```

- [ ] **Step 3: Update root tsconfig.json references**

Replace the `references` array in `tsconfig.json`:

```json
"references": [
  {
    "path": "./src/tsconfig.app.json"
  },
  {
    "path": "./src/tsconfig.spec.json"
  }
]
```

- [ ] **Step 4: Delete root tsconfig files**

```bash
rm tsconfig.app.json tsconfig.spec.json
```

- [ ] **Step 5: Verify angular.json already points to src/ tsconfigs** (done in Task 2)

In `angular.json`, the test builder should also reference the spec tsconfig:

Under `projects["angular-client"].architect.test`, ensure:
```json
"test": {
  "builder": "@angular/build:unit-test",
  "options": {
    "tsConfig": "src/tsconfig.spec.json"
  }
}
```

- [ ] **Step 6: Commit**

```bash
git add src/tsconfig.app.json src/tsconfig.spec.json tsconfig.json angular.json
git rm tsconfig.app.json tsconfig.spec.json
git commit -m "build: move tsconfig.app.json and tsconfig.spec.json into src/"
```

---

## Task 4: Update package.json scripts and dependencies

**Files:**
- Modify: `package.json`

The dev workflow now uses `nodemon` (server restart on change) and `rimraf` (cross-platform clean). Both must be in `devDependencies`. The `start` script uses Windows `set NODE_ENV=local&&` syntax per spec; CI/Linux usage goes through the explicit `start:server:*` scripts which also use this syntax.

- [ ] **Step 1: Install rimraf and nodemon**

```bash
npm install --save-dev rimraf nodemon
```

- [ ] **Step 2: Replace the scripts section in package.json**

The full `scripts` object becomes:

```json
"scripts": {
  "ng": "ng",
  "start": "set NODE_ENV=local&&nodemon server/app.js",
  "clean": "rimraf ./server/public/www",
  "test": "ng test",
  "lint": "ng lint",
  "e2e": "ng e2e",
  "start:server:local": "set NODE_ENV=local&&nodemon server/app.js",
  "start:server:qa": "set NODE_ENV=qa&&node server/app.js",
  "start:server:dev": "set NODE_ENV=dev&&nodemon server/app.js",
  "start:server:prod": "set NODE_ENV=production&&node server/app.js",
  "start:client:dev": "npm run clean && ng build --watch",
  "build": "ng build",
  "build:watch": "ng build --watch",
  "build:prod": "ng build --configuration production --aot --build-optimizer",
  "build:client:prod": "rimraf ./server/public/www && ng build --configuration production --aot --build-optimizer"
},
```

Note: `ng lint` and `ng e2e` may not yet have builder config — that is a pre-existing state (not introduced by this change).

- [ ] **Step 3: Delete proxy.conf.json**

```bash
rm proxy.conf.json
```

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git rm proxy.conf.json
git commit -m "build: update package.json scripts for static-only dev workflow"
```

---

## Task 5: Refactor server/app.js — remove ng-serve proxy, always serve static

**Files:**
- Modify: `server/app.js`

Since `ng build --watch` now outputs to `server/public/www/` for ALL environments, the BFF always serves static assets. The ngDevProxy branch and WebSocket forwarding are removed.

- [ ] **Step 1: Replace the SPA-serving section in server/app.js**

Replace lines starting from `// ── SPA:` to the end of the file with:

```js
// ── SPA: serve Angular static build from server/public/www ───────────────────
const staticDir = path.join(__dirname, config.staticDir);
app.use(express.static(staticDir));
app.use('/', appRouter);

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`[BFF] listening on port ${PORT} (${process.env.NODE_ENV || 'local'})`);
  console.log(`[BFF] serving static files from: ${staticDir}`);
});
```

The full file becomes:

```js
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
      scriptSrc: ["'self'", "'unsafe-inline'"],
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
```

- [ ] **Step 2: Verify syntax**

```bash
node --check server/app.js
```
Expected: no output

- [ ] **Step 3: Commit**

```bash
git add server/app.js
git commit -m "refactor: always serve static assets; remove ng-serve proxy branch"
```

---

## Task 6: Update config files — rename envs, remove ngDevServer key

**Files:**
- Modify: `server/config/config.example.json`
- Rename: `server/config/config.development.json` → `server/config/config.dev.json`
- Create: `server/config/config.local.json`
- Create: `server/config/config.qa.json`
- Modify: `server/config/config.production.json`
- Modify: `.gitignore`

- [ ] **Step 1: Update config.example.json — remove ngDevServer**

New content of `server/config/config.example.json`:

```json
{
  "port": 3000,
  "session": {
    "secret": "CHANGE_ME_to_a_long_random_string",
    "maxAgeHours": 8
  },
  "oidc": {
    "issuerUrl": "https://auth.example.com/application/o/<slug>/",
    "clientId": "YOUR_CLIENT_ID",
    "clientSecret": "YOUR_CLIENT_SECRET",
    "callbackUrl": "http://localhost:3000/auth/callback",
    "postLogoutRedirectUrl": "http://localhost:3000"
  },
  "backend": {
    "url": "http://localhost:4000"
  },
  "cors": {
    "origin": false
  },
  "staticDir": "public/www"
}
```

- [ ] **Step 2: Rename config.development.json → config.dev.json**

```bash
mv server/config/config.development.json server/config/config.dev.json
```

Remove the `ngDevServer` key from `server/config/config.dev.json`:

```json
{
  "port": 3000,
  "session": {
    "secret": "CHANGE_ME_to_a_long_random_string",
    "maxAgeHours": 8
  },
  "oidc": {
    "issuerUrl": "https://auth.example.com/application/o/<slug>/",
    "clientId": "YOUR_CLIENT_ID",
    "clientSecret": "YOUR_CLIENT_SECRET",
    "callbackUrl": "http://localhost:3000/auth/callback",
    "postLogoutRedirectUrl": "http://localhost:3000"
  },
  "backend": {
    "url": "http://localhost:4000"
  },
  "cors": {
    "origin": false
  },
  "staticDir": "public/www"
}
```

- [ ] **Step 3: Create server/config/config.local.json**

```json
{
  "port": 3000,
  "session": {
    "secret": "CHANGE_ME_to_a_long_random_string",
    "maxAgeHours": 8
  },
  "oidc": {
    "issuerUrl": "https://auth.example.com/application/o/<slug>/",
    "clientId": "YOUR_CLIENT_ID",
    "clientSecret": "YOUR_CLIENT_SECRET",
    "callbackUrl": "http://localhost:3000/auth/callback",
    "postLogoutRedirectUrl": "http://localhost:3000"
  },
  "backend": {
    "url": "http://localhost:4000"
  },
  "cors": {
    "origin": false
  },
  "staticDir": "public/www"
}
```

- [ ] **Step 4: Create server/config/config.qa.json**

```json
{
  "port": 3000,
  "session": {
    "secret": "CHANGE_ME_to_a_long_random_string",
    "maxAgeHours": 8
  },
  "oidc": {
    "issuerUrl": "https://auth.example.com/application/o/<slug>/",
    "clientId": "YOUR_CLIENT_ID",
    "clientSecret": "YOUR_CLIENT_SECRET",
    "callbackUrl": "https://qa.example.com/auth/callback",
    "postLogoutRedirectUrl": "https://qa.example.com"
  },
  "backend": {
    "url": "http://backend:4000"
  },
  "cors": {
    "origin": false
  },
  "staticDir": "public/www"
}
```

- [ ] **Step 5: Remove ngDevServer from config.production.json**

Update `server/config/config.production.json` to remove the `ngDevServer` key (keep all other existing values).

- [ ] **Step 6: Update .gitignore config section**

Replace the config secrets block with:

```
# Config files containing secrets — copy config.example.json and fill in values
server/config/config.local.json
server/config/config.dev.json
server/config/config.qa.json
server/config/config.production.json
```

- [ ] **Step 7: Commit**

```bash
git add server/config/ .gitignore
git rm server/config/config.development.json
git commit -m "config: rename dev config, add local/qa envs, remove ngDevServer key"
```

---

## Task 7: Replace Dockerfile with Dockerfile.[ENV]

**Files:**
- Delete: `Dockerfile`
- Delete: `docker-compose.yml`
- Create: `Dockerfile.local`
- Create: `Dockerfile.dev`
- Create: `Dockerfile.qa`
- Create: `Dockerfile.prod`

> **Pre-build requirement:** Angular must be built to `server/public/www/` before running any `docker build`. Run `npm run build:client:prod` first. The `COPY server server/` step includes the built assets.

- [ ] **Step 1: Delete old files**

```bash
rm Dockerfile docker-compose.yml
```

- [ ] **Step 2: Create Dockerfile.local**

```dockerfile
FROM node:22-alpine
ENV NODE_ENV=local
ENV VCAP_APP_PORT=3000
COPY server server/
COPY package*.json ./
RUN cd server && npm ci --omit=dev
EXPOSE 3000
CMD [ "node", "server/app.js"]
```

- [ ] **Step 3: Create Dockerfile.dev**

```dockerfile
FROM node:22-alpine
ENV NODE_ENV=dev
ENV VCAP_APP_PORT=3000
COPY server server/
COPY package*.json ./
RUN cd server && npm ci --omit=dev
EXPOSE 3000
CMD [ "node", "server/app.js"]
```

- [ ] **Step 4: Create Dockerfile.qa**

```dockerfile
FROM node:22-alpine
ENV NODE_ENV=qa
ENV VCAP_APP_PORT=3000
COPY server server/
COPY package*.json ./
RUN cd server && npm ci --omit=dev
EXPOSE 3000
CMD [ "node", "server/app.js"]
```

- [ ] **Step 5: Create Dockerfile.prod**

```dockerfile
FROM node:22-alpine
ENV NODE_ENV=production
ENV VCAP_APP_PORT=3000
COPY server server/
COPY package*.json ./
RUN cd server && npm ci --omit=dev
EXPOSE 3000
CMD [ "node", "server/app.js"]
```

- [ ] **Step 6: Commit**

```bash
git add Dockerfile.local Dockerfile.dev Dockerfile.qa Dockerfile.prod
git rm Dockerfile docker-compose.yml
git commit -m "build: replace multi-stage Dockerfile + docker-compose with Dockerfile.[ENV]"
```

---

## Task 8: Self-test — verify Angular build and server syntax

**Files:**
- No file changes; verification only

- [ ] **Step 1: Check all server JS files for syntax errors**

```bash
node --check server/app.js && \
node --check server/config/config.js && \
node --check server/config/passport.js && \
node --check server/routes/appRoute.js && \
echo "All server files: syntax OK"
```
Expected: `All server files: syntax OK`

- [ ] **Step 2: Verify config module loads with NODE_ENV=local**

```bash
NODE_ENV=local node -e "const c = require('./server/config/config'); console.log('Config keys:', Object.keys(c).join(', '))"
```
Expected: `Config keys: port, session, oidc, backend, cors, staticDir`

- [ ] **Step 3: Run Angular build (production configuration)**

```bash
npm run build:client:prod
```
Expected: Build succeeds; `server/public/www/` is populated with `index.html` + hashed JS/CSS bundles.

- [ ] **Step 4: Verify server can find static dir after build**

```bash
ls server/public/www/index.html
```
Expected: file exists

- [ ] **Step 5: Run unit tests**

```bash
ng test --watch=false
```
Expected: All tests pass (or pre-existing failures only — no regressions from this change).

- [ ] **Step 6: Commit verification artefacts (build output is gitignored)**

```bash
# server/public/www/ is already gitignored via /dist or similar
git status  # confirm no untracked build artefacts are staged
```

---

## Task 9: Update .github/copilot-instructions.md

**Files:**
- Modify: `.github/copilot-instructions.md` — Section 11 (Build and Run)

- [ ] **Step 1: Replace the Build and Run section**

Update Section 11 to reflect the new workflow:

```markdown
## 11. Build and Run

### Development (two terminals)

```bash
# Terminal 1 — BFF + static file server (port 3000)
npm run start:server:local          # NODE_ENV=local nodemon server/app.js

# Terminal 2 — Angular build watcher (outputs to server/public/www/)
npm run start:client:dev            # rimraf ./server/public/www && ng build --watch
```

Access the app at **http://localhost:3000** only. There is no separate Angular dev server port.
The BFF serves whatever `ng build --watch` has output to `server/public/www/` on each save.
Refresh the browser after the build watcher reports "Build complete."

### Testing

```bash
npm test                   # ng test (vitest)
npm run lint               # ng lint
```

### Production Build

```bash
npm run build:client:prod  # rimraf server/public/www && ng build --configuration production
docker build -f Dockerfile.prod -t tntt-app:prod .
docker run -p 3000:3000 tntt-app:prod
```

Config for each environment must be present at `server/config/config.[ENV].json` (copy from `config.example.json`).

### Docker targets

| File | NODE_ENV |
|------|----------|
| `Dockerfile.local` | local |
| `Dockerfile.dev` | dev |
| `Dockerfile.qa` | qa |
| `Dockerfile.prod` | production |
```

- [ ] **Step 2: Commit**

```bash
git add .github/copilot-instructions.md
git commit -m "docs: update build/run instructions for static-only dev workflow"
```

---

## Self-Review Checklist

- [x] Point 1 — `public/www` inside `server/`: `outputPath.base = "server/public/www"` in angular.json ✓
- [x] Point 2 — `package.json` scripts match spec exactly; `proxy.conf.json` deleted ✓
- [x] Point 3 — `tsconfig.app.json` + `tsconfig.spec.json` moved to `src/` ✓
- [x] Point 4 — `docker-compose.yml` + `Dockerfile` deleted; `Dockerfile.[ENV]` files created ✓
- [x] Point 5 — Self-test task (Task 8) covers syntax check, build, and unit tests ✓
- [x] `server/server.js` renamed to `server/app.js` everywhere ✓
- [x] `config.development.json` renamed to `config.dev.json`; `config.local.json` + `config.qa.json` created ✓
- [x] `ngDevServer` config key removed from all config files ✓
- [x] `.gitignore` updated with new config filenames ✓
- [x] No placeholder steps — all code blocks are complete ✓
