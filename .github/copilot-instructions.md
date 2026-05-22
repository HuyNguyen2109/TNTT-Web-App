# Copilot Instructions — TNTT App Migration (React → Angular + BFF)

## 1. Project Overview

This is a **management web application** for a Vietnamese Catholic youth ministry organization
(**Thiếu Nhi Thánh Thể — TNTT**). It manages:

- **Thiếu Nhi** (students / children)
- **Giáo Lý Viên / GLV** (teachers / catechists)
- **Quỹ** (funds: Quỹ Thiếu Nhi + Quỹ Xứ Đoàn)
- **Lớp** (classes), **Sự kiện** (events), **Tài liệu** (documents)

**UI language**: Vietnamese. All display labels, form fields, toast messages, and navigation
items should be in Vietnamese unless the code context is purely technical.

**Migration status**: The React 17 + Material-UI frontend and legacy `webapp/` backend are removed.
The app is now a standard **Angular (standalone) + PrimeNG** SPA at the repo root, with a
**Backend-for-Frontend (BFF)** layer in `server/`. An external upstream API backend is consumed
through the BFF proxy.

---

## Quick Reference — Key Rules

| Rule | Decision |
|---|---|
| Angular version | Angular 21, standalone components, no `NgModule` |
| State management | RxJS + Angular Signals — **no NgRx** |
| UI library | PrimeNG + PrimeFlex — **no MUI imports** |
| Auth | Passport.js OIDC in `server/` — Angular only calls `/auth/user` |
| HTTP | All calls via `HttpClient` + `ApiInterceptor` (`withCredentials: true`) |
| API target | Angular → BFF (`server/`) only |
| BFF config | `server/config/config.[ENV].json` — **no `.env`, no env vars except `NODE_ENV`** |
| Packages | Always `npm install` + update `package.json` before using a new import |
| UI language | Vietnamese for all labels, toasts, and navigation text |

---

## 2. Target Architecture

```
┌──────────────────────┐        ┌────────────────────────────────┐        ┌──────────────────────────┐
│  Angular SPA         │  HTTP  │  server/  (BFF)                │  HTTP  │  Upstream API backend    │
│  (root of repo)      │◀──────▶│  Express + Passport.js         │◀──────▶│  Express + MongoDB       │
│  PrimeNG, SCSS       │        │  OIDC session owner            │        │  Unchanged REST API      │
└──────────────────────┘        │  Static SPA serving (prod)     │        └──────────────────────────┘
                                 │  /api/* proxy                  │
                                 │  /auth/* OIDC routes           │
                                 └──────────────┬─────────────────┘
                                                │ OIDC redirect
                                                ▼
                                        Authentik (self-hosted)
```

**BFF responsibilities (`server/`)**:
1. Serve the Angular `dist/` as static files in production (from `server/public/www/`).
2. Own the user session via `express-session` + Passport.js.
3. Proxy all `/api/*` requests to the backend, protected by an inlined `ensureAuthenticated` check.
4. Handle `/auth/login`, `/auth/callback`, `/auth/logout`, `/auth/user` routes inline in `server.js`.

---

## 3. Repository Structure

```
/                              ← Standard Angular application root
├── .github/                   ← AI instructions, GitHub workflows
├── src/                       ← Angular source
│   └── app/
│       ├── app.routes.ts      ← Root routes; ShellComponent wraps all authenticated children
│       ├── app.config.ts      ← provideRouter, provideHttpClient, providePrimeNG, i18n
│       ├── core/              ← AuthService, AuthGuard, apiInterceptor, User model
│       ├── features/          ← One subfolder per domain entity (lazy-loaded)
│       │   ├── dashboard/
│       │   ├── children/
│       │   ├── members/
│       │   ├── funds/
│       │   ├── classes/
│       │   ├── events/
│       │   └── documents/
│       └── shared/            ← ShellComponent, sidebar, topbar layouts
├── public/                    ← Static assets served by Angular CLI
├── angular.json               ← CLI config; ng generate uses SCSS + standalone by default
├── proxy.conf.json            ← Dev proxy: /api and /auth → BFF at :3000
├── package.json               ← Angular dependencies
├── Dockerfile                 ← Multi-stage: Stage 1 builds Angular, Stage 2 runs BFF
├── docker-compose.yml
│
└── server/                    ← BFF layer
    ├── server.js              ← Entry point; auth routes + ensureAuthenticated inlined here
    ├── config/
    │   ├── config.js          ← Loads config.${NODE_ENV}.json
    │   ├── config.example.json ← Template — copy and rename to config.development.json etc.
    │   ├── config.development.json  ← ⚠️ gitignored — contains secrets
    │   ├── config.production.json   ← ⚠️ gitignored — contains secrets
    │   └── passport.js        ← Passport OIDC strategy (reads from config)
    ├── routes/
    │   └── appRoute.js        ← Enumerates Angular routes → serve index.html from public/www
    ├── public/www/            ← Angular build output (production only, populated by Docker)
    └── package.json
```

---

## 4. Angular Conventions

### Component Style
- Use Angular 21 with standalone components, signals, and functional APIs.
- **Always use standalone components** (`standalone: true`). Never generate `NgModule`.
- One component per file; selector prefix: `app-`.
- Styles in a co-located `.component.scss` file.
- Use `@ngx-translate` module for i18n, move all hardcoded Vietnamese strings to translation JSON files. (vi.json)
- Change from Javascript to Typescript, with strict typing enabled in `tsconfig.json`.
- Default TSLinting rules from Angular CLI, with custom rules added as needed (e.g. for naming conventions).

### Routing
- Root `app.routes.ts` with lazy routes using `loadComponent` (for single components) or
  `loadChildren` (for feature route files).
- `ShellComponent` is the layout wrapper for **all authenticated routes** — `AuthGuard` is applied to the shell parent, not per-feature.
- Actual route structure:
  ```ts
  export const routes: Routes = [
    { path: 'callback', loadComponent: () => import('./core/auth-callback/auth-callback.component').then(m => m.AuthCallbackComponent) },
    {
      path: '',
      component: ShellComponent,
      canActivate: [AuthGuard],
      children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
        { path: 'children',  loadChildren: () => import('./features/children/children.routes').then(m => m.CHILDREN_ROUTES) },
        // ... other feature routes
      ],
    },
    { path: '**', redirectTo: 'dashboard' },
  ];
  ```

### State Management
- **No NgRx.** Use RxJS + Angular Signals only.
- Services expose data as `signal<T | null>(null)` for local consumption and
  `BehaviorSubject<T>` / `Observable<T>` for shared reactive streams.
- `AuthService` pattern:
  ```ts
  currentUser = signal<User | null>(null);
  isAuthenticated = computed(() => this.currentUser() !== null);
  ```
- Use `effect()` to react to signal changes that drive side effects (e.g., redirects).

### HTTP
- All HTTP calls use `HttpClient` via `inject(HttpClient)` (functional injection preferred).
- A single `ApiInterceptor` sets `withCredentials: true` on every outgoing request so the
  BFF session cookie is sent automatically.
  ```ts
  export const apiInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req.clone({ withCredentials: true }));
  };
  ```
- Register in `app.config.ts`:
  ```ts
  provideHttpClient(withInterceptors([apiInterceptor]))
  ```

### AuthGuard
- Functional guard calling `AuthService.checkSession()` (GET `/auth/user`).
- If unauthenticated (401), redirect browser to `/auth/login` on the BFF — **full page
  navigation**, not Angular Router navigation.
  ```ts
  export const AuthGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    return auth.checkSession().pipe(
      map(user => { auth.currentUser.set(user); return true; }),
      catchError(() => { window.location.href = '/auth/login'; return of(false); })
    );
  };
  ```

### Folder / File Naming
- Files: `kebab-case.component.ts`, `kebab-case.service.ts`, `kebab-case.routes.ts`.
- Feature services: `ChildrenService`, `UserService`, `FundService`, `ClassService`,
  `EventService`, `DocumentService` — all in their respective feature folder's `services/`
  subfolder.

---

## 5. PrimeNG Component Mapping

Always use PrimeNG equivalents. Never use Material-UI or any MUI import.

| MUI (legacy) | PrimeNG (target) | Notes |
|---|---|---|
| `Button` | `p-button` / `pButton` directive | `severity` prop for variants |
| `TextField` / custom `Input` | `p-inputText` + `p-inputGroup` / `p-floatLabel` | |
| `DataGrid` / table | `p-table` + `p-paginator` + `p-column` | |
| `Dialog` | `p-dialog` | |
| `Snackbar` | `p-toast` + `MessageService` | inject `MessageService`, call `this.ms.add(...)` |
| `Drawer` / sidebar nav | `p-sidebar` + `p-panelMenu` | |
| `AppBar` / top bar | custom component using `p-toolbar` | |
| `Card` | `p-card` | |
| MUI `Grid` layout | **PrimeFlex** utility classes (`p-grid`, `p-col-*`, `flex`) | |
| `LinearProgress` / spinner | `p-progressBar` / `p-progressSpinner` | |
| `Avatar` | `p-avatar` | |
| `Badge` | `p-badge` | |
| `Tabs` / `TabPanel` | `p-tabView` / `p-tabs` (PrimeNG 17+) | |
| `Checkbox` | `p-checkbox` | |
| `DatePicker` / `@material-ui/pickers` | `p-datePicker` / `p-calendar` | |
| `Select` / `Autocomplete` | `p-dropdown` / `p-autoComplete` | |
| `Chip` | `p-chip` | |
| `Tooltip` | `pTooltip` directive | |

Import PrimeNG components directly in standalone `imports: []` arrays.

---

## 6. Server (BFF) Conventions

### Configuration (`server/config/`)

All BFF settings live in `server/config/config.[ENV].json`. **No `.env` file, no `dotenv`.**
The only runtime environment variable is `NODE_ENV`.

`server/config/config.js` auto-loads the right file:
```js
const env = process.env.NODE_ENV || 'development';
module.exports = require(`./config.${env}.json`);
```

Config JSON shape (see `config.example.json` for the full template):
```json
{
  "port": 3000,
  "session": { "secret": "...", "maxAgeHours": 8 },
  "oidc": {
    "issuerUrl": "https://auth.example.com/application/o/<slug>/",
    "clientId": "...", "clientSecret": "...",
    "callbackUrl": "http://localhost:3000/auth/callback",
    "postLogoutRedirectUrl": "http://localhost:3000"
  },
  "backend": { "url": "http://localhost:4000" },
  "cors": { "origin": false },
  "ngDevServer": { "url": "http://localhost:4200" },
  "staticDir": "public/www"
}
```

> ⚠️ `config.development.json` and `config.production.json` are **gitignored** because they
> contain secrets. Copy `config.example.json` to get started.

### Middleware Order (strictly preserved in `server.js`)
```js
const config = require('./config/config');

app.use(helmet(...));
app.use(cors({ origin: config.cors.origin, credentials: true }));
app.use(express.json());
app.use(session({ secret: config.session.secret, ... }));
app.use(passport.initialize());
app.use(passport.session());
// /auth/* routes inlined directly (no router file)
app.get('/auth/login', ...);
app.get('/auth/callback', ...);
app.get('/auth/logout', ...);
app.get('/auth/user', ...);
// ensureAuthenticated inlined as a local function
app.use('/api', ensureAuthenticated, apiProxyMiddleware);
// Production: static files + appRoute; Dev: proxy to ng serve
```

### Auth Routes (inlined in `server.js`)
```
GET  /auth/login     → passport.authenticate('openidconnect')
GET  /auth/callback  → passport.authenticate('openidconnect', { failureRedirect: '/auth/login' })
                       → on success: redirect to '/'
GET  /auth/logout    → req.logout() + redirect to Authentik end_session_endpoint
GET  /auth/user      → 200 { user } if req.isAuthenticated() else 401
```

### `ensureAuthenticated` (inlined in `server.js`)
```js
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: 'Unauthenticated' });
};
```

### SPA Routes (`server/routes/appRoute.js`)
Explicitly maps every Angular top-level route + sub-paths to serve `index.html` from
`config.staticDir` (`public/www`). Used in production only.
When adding a new Angular route, **add it to `ANGULAR_ROUTES` in `appRoute.js` too**.

### API Proxy
```js
const { createProxyMiddleware } = require('http-proxy-middleware');
const apiProxyMiddleware = createProxyMiddleware({
  target: config.backend.url,
  changeOrigin: true,
});
```

---

## 7. Domain Entities Reference

| Angular Feature Folder | Service Class | BFF Proxy Prefix | Vietnamese Name |
|---|---|---|---|
| `features/children` | `ChildrenService` | `/api/children` | Thiếu Nhi |
| `features/members` | `UserService` | `/api/user` | Giáo Lý Viên (GLV) |
| `features/classes` | `ClassService` | `/api/class` | Lớp |
| `features/funds` | `FundService` | `/api/childrenFund`, `/api/internalFund` | Quỹ |
| `features/events` | `EventService` | `/api/event` | Sự kiện |
| `features/documents` | `DocumentService` | `/api/document` | Tài liệu |

Existing backend route files to reference for request/response shapes are no longer in this
repo. Use the API documentation or inspect live BFF proxy traffic during development.

---

## 8. Angular Service Pattern

Each feature service must:
1. Be `@Injectable({ providedIn: 'root' })`.
2. Inject `HttpClient` via `inject(HttpClient)`.
3. Expose data as a `signal` for template consumption and return `Observable` from methods.

```ts
@Injectable({ providedIn: 'root' })
export class ChildrenService {
  private http = inject(HttpClient);

  children = signal<Child[]>([]);
  loading  = signal<boolean>(false);

  getAll(page: number): Observable<Child[]> {
    this.loading.set(true);
    return this.http.get<Child[]>(`/api/children/all/${page}`).pipe(
      tap(data => { this.children.set(data); this.loading.set(false); }),
      catchError(err => { this.loading.set(false); throw err; })
    );
  }
}
```

---

## 9. Dockerfile / Build Strategy

Multi-stage `Dockerfile` at the repo root:

```dockerfile
# Stage 1 — build Angular SPA
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx ng build --configuration production

# Stage 2 — BFF
FROM node:22-alpine
WORKDIR /app
COPY server/package*.json ./
RUN npm ci --omit=dev
COPY server/ .
COPY --from=builder /app/dist/angular-client/browser ./public/www
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "server.js"]
```

- Angular output (`dist/angular-client/browser/`) lands in `server/public/www/` inside the image.
- **Only `NODE_ENV=production` is set in the image.** All other config is in
  `server/config/config.production.json`, which must be present on the build host
  (or injected as a mounted secret in CI).

```yaml
# docker-compose.yml
services:
  tntt-server:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
```

---

## 10. Package Installation Rule

**When generating code that requires npm packages not already present in the relevant
`package.json`, always**:

1. Emit the install command immediately after the code block:
   - For Angular (root): `npm install <package-name>` or `ng add <package-name>`
   - For `server/`: `cd server && npm install <package-name>`
2. Show the updated `dependencies` entry in `package.json`.
3. Never leave an `import` or `require()` referencing an undeclared package.

---

## 11. Build and Run

### Development (two terminals)

```bash
# Terminal 1 — BFF + static file server (port 3000)
npm run start:server:local     # NODE_ENV=local nodemon server/app.js

# Terminal 2 — Angular build watcher (outputs to server/public/www/)
npm run start:client:dev       # rimraf ./server/public/www && ng build --watch
```

Access the app at **http://localhost:3000** only. There is no separate Angular dev server port.
The BFF always serves static assets from `server/public/www/`. Refresh the browser after
`ng build --watch` reports "Build complete."

### npm scripts reference

| Script | Purpose |
|--------|---------|
| `npm run start:server:local` | Start BFF with NODE_ENV=local (nodemon) |
| `npm run start:server:dev` | Start BFF with NODE_ENV=dev (nodemon) |
| `npm run start:server:qa` | Start BFF with NODE_ENV=qa |
| `npm run start:server:prod` | Start BFF with NODE_ENV=production |
| `npm run start:client:dev` | Clean + ng build --watch |
| `npm run build:client:prod` | Clean + ng build production (CI/Docker pre-step) |
| `npm test` | Run unit tests (vitest) |
| `npm run clean` | rimraf server/public/www |

### Testing

```bash
npm test           # ng test (vitest), single run
```

### Production Build

Run the Angular build first, then build the Docker image:

```bash
npm run build:client:prod               # outputs to server/public/www/
docker build -f Dockerfile.prod -t tntt-app:prod .
docker run -p 3000:3000 tntt-app:prod
```

Config for each environment must be present at `server/config/config.[ENV].json`
(copy from `server/config/config.example.json` and fill in real values).

### Docker targets

| File | NODE_ENV |
|------|----------|
| `Dockerfile.local` | local |
| `Dockerfile.dev` | dev |
| `Dockerfile.qa` | qa |
| `Dockerfile.prod` | production |

---

## 12. OIDC Auth Flow

```
User visits protected route
        │
        ▼
  AuthGuard calls GET /auth/user
        │
  ┌─────┴──────┐
  │ 200 OK     │ 401 Unauthenticated
  │            │
  ▼            ▼
Route loads  window.location.href = '/auth/login'
                      │
                      ▼
             BFF → Authentik login page
                      │
                      ▼
             Authentik → GET /auth/callback
                      │
                      ▼
             BFF sets session → redirect to '/'
                      │
                      ▼
              Angular app loads, AuthGuard passes
```

**Logout flow**: Angular calls `GET /auth/logout` on BFF → BFF destroys session →
redirects to Authentik `end_session_endpoint` with `id_token_hint` and
`post_logout_redirect_uri` (from `config.oidc.postLogoutRedirectUrl`).
