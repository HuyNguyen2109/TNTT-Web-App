# NgModule Restructure + UI Redesign — Design Spec

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` or `superpowers:executing-plans` to implement this plan task-by-task.

**Goal:** Convert all feature areas from standalone-component lazy routes to NgModule-based lazy modules, restructure `features/` → `modules/` per the new folder convention, extract all inline templates to `.component.html` files, and improve UI quality using PrimeNG v19 patterns.

**Architecture:** NgModule-based lazy loading per feature; `app.routes.ts` uses `loadChildren` pointing to each feature's routing module. Core/Shared remain standalone. Components inside feature modules are NOT standalone — they are declared in their module. Services remain `providedIn: 'root'`.

**Tech Stack:** Angular 21, PrimeNG v19 (Aura theme), PrimeFlex, @ngx-translate/core, RxJS + Signals.

---

## 1. Architectural Decision: NgModule vs Standalone

The previous convention (`copilot-instructions.md`) mandated standalone components and no NgModules. The user's current request explicitly specifies `.module.ts` + `-routing.module.ts` files for every feature. **The current user request overrides the old convention.**

### What changes
- Feature components: remove `standalone: true`, add to module `declarations[]`
- Feature routes: `loadChildren` → `*.module.ts` instead of `loadComponent` / standalone routes
- PrimeNG modules (e.g., `TableModule`, `ButtonModule`) are imported in the feature NgModule's `imports[]` — not per-component

### What stays the same
- `core/` services, guards, interceptors remain standalone/functional
- `shared/layout/` components remain standalone (shell, topbar, sidebar)
- `app.config.ts` uses functional `provide*` API (no AppModule)
- `app.routes.ts` uses functional `Routes` array (no RouterModule.forRoot)
- Services stay `@Injectable({ providedIn: 'root' })`

---

## 2. New Folder Structure

```
src/app/
├── core/                          ← unchanged (standalone)
│   ├── auth-callback/
│   ├── guards/
│   ├── interceptors/
│   ├── models/
│   └── services/
├── modules/                       ← renamed from features/
│   ├── dashboard/
│   │   ├── components/
│   │   │   └── main/
│   │   │       ├── dashboard.component.ts
│   │   │       ├── dashboard.component.html
│   │   │       └── dashboard.component.scss
│   │   ├── constants/             ← (empty, reserved)
│   │   ├── models/
│   │   │   └── dashboard-stats.model.ts
│   │   ├── services/              ← (empty; uses HttpClient directly)
│   │   ├── dashboard.module.ts
│   │   └── dashboard-routing.module.ts
│   ├── children/
│   │   ├── components/
│   │   │   └── main/
│   │   │       ├── children-list.component.ts
│   │   │       ├── children-list.component.html
│   │   │       └── children-list.component.scss
│   │   ├── constants/
│   │   ├── models/
│   │   │   └── child.model.ts
│   │   ├── services/
│   │   │   └── children.service.ts
│   │   ├── children.module.ts
│   │   └── children-routing.module.ts
│   ├── members/
│   │   ├── components/main/
│   │   ├── constants/
│   │   ├── models/
│   │   │   └── member.model.ts
│   │   ├── services/
│   │   │   └── user.service.ts
│   │   ├── members.module.ts
│   │   └── members-routing.module.ts
│   ├── funds/
│   │   ├── components/main/
│   │   ├── constants/
│   │   ├── models/
│   │   │   └── fund-entry.model.ts
│   │   ├── services/
│   │   │   └── fund.service.ts
│   │   ├── funds.module.ts
│   │   └── funds-routing.module.ts
│   ├── classes/
│   │   ├── components/main/
│   │   ├── constants/
│   │   ├── models/
│   │   │   └── class.model.ts
│   │   ├── services/
│   │   │   └── class.service.ts
│   │   ├── classes.module.ts
│   │   └── classes-routing.module.ts
│   ├── events/
│   │   ├── components/main/
│   │   ├── constants/
│   │   ├── models/
│   │   │   └── event.model.ts
│   │   ├── services/
│   │   │   └── event.service.ts
│   │   ├── events.module.ts
│   │   └── events-routing.module.ts
│   └── documents/
│       ├── components/main/
│       ├── constants/
│       ├── models/
│           └── document.model.ts
│       ├── services/
│       │   └── document.service.ts
│       ├── documents.module.ts
│       └── documents-routing.module.ts
└── shared/                        ← unchanged (standalone layout components)
    └── layout/
        ├── shell/
        ├── topbar/
        └── sidebar/
```

---

## 3. Module Pattern (applied to all 7 feature modules)

### `<name>-routing.module.ts`
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { XxxListComponent } from './components/main/xxx-list.component';

const routes: Routes = [{ path: '', component: XxxListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class XxxRoutingModule {}
```

### `<name>.module.ts`
```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XxxRoutingModule } from './xxx-routing.module';
import { XxxListComponent } from './components/main/xxx-list.component';
// PrimeNG imports…
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [XxxListComponent],
  imports: [CommonModule, XxxRoutingModule, TableModule, /* … */],
})
export class XxxModule {}
```

### Component (non-standalone)
```typescript
@Component({
  selector: 'app-xxx-list',
  templateUrl: './xxx-list.component.html',
  styleUrl: './xxx-list.component.scss',
})
export class XxxListComponent implements OnInit { … }
```

---

## 4. `app.routes.ts` — loadChildren Update

All feature routes switch from `loadComponent`/standalone routes to `loadChildren` → NgModule:

```typescript
{ path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
{ path: 'children',  loadChildren: () => import('./modules/children/children.module').then(m => m.ChildrenModule) },
{ path: 'members',   loadChildren: () => import('./modules/members/members.module').then(m => m.MembersModule) },
{ path: 'funds',     loadChildren: () => import('./modules/funds/funds.module').then(m => m.FundsModule) },
{ path: 'classes',   loadChildren: () => import('./modules/classes/classes.module').then(m => m.ClassesModule) },
{ path: 'events',    loadChildren: () => import('./modules/events/events.module').then(m => m.EventsModule) },
{ path: 'documents', loadChildren: () => import('./modules/documents/documents.module').then(m => m.DocumentsModule) },
```

---

## 5. UI Redesign — PrimeNG v19 Patterns

### Shell Layout
- Keep current flex layout (sidebar + content area)
- Sidebar: add org crest/logo area above nav, use `p-panelMenu` with collapsed header items per section
- Topbar: add page title (route-based), keep user area on right

### Dashboard
Current: 4 bare cards in a grid.
New: Stat cards using `p-card` with:
- Coloured left border accent (CSS)
- Large icon in a tinted circle (`p-badge`-style)
- Large numeric value
- Label below
- No header template — content-only layout

### List pages (Children, Members, Classes, Events, Documents)
Current: raw table with inline search `<input>`.
New standard pattern per list page:
- `p-toolbar` at top: left = page title + badge (record count); right = `p-iconfield` search + primary action button
- `p-table` with `[globalFilterFields]`, `[paginator]="true"`, `styleClass="p-datatable-gridlines p-datatable-striped p-datatable-sm"`
- Use `p-iconfield` + `p-inputicon` (`pi-search`) for search input (PrimeNG v19)
- Action buttons column: `p-button [text]="true"` edit + delete (unchanged)

### Funds page
Current: tabs wrapping two tables.
Keep: `p-tabs` / `p-tablist` / `p-tabpanel` approach — already uses PrimeNG v19 tabs API.
Improvement: Same `p-toolbar` pattern inside each tab panel.

### Template files
Every component's `template: \`...\`` moves to a `.component.html` file referenced by `templateUrl`.

---

## 6. Model Extraction

Interface/type definitions currently embedded in service files are extracted to `models/`:

| Current location | New location |
|---|---|
| `children.service.ts` — `Child` interface | `children/models/child.model.ts` |
| `user.service.ts` — `Member` interface | `members/models/member.model.ts` |
| `fund.service.ts` — `FundEntry` interface | `funds/models/fund-entry.model.ts` |
| `class.service.ts` — `Class` interface | `classes/models/class.model.ts` |
| `event.service.ts` — `Event` interface | `events/models/event.model.ts` |
| `document.service.ts` — `Doc` interface | `documents/models/document.model.ts` |
| `dashboard.component.ts` — `DashboardStats` | `dashboard/models/dashboard-stats.model.ts` |

---

## 7. `copilot-instructions.md` Update

Section 4 "Angular Conventions" needs updating:
- Change "standalone components, no NgModule" to reflect the new hybrid approach
- Update routing section to show NgModule pattern
- Update folder structure diagram in Section 3

---

## 8. What Is NOT Changing

- `core/` — auth guard, interceptor, auth service, models remain standalone/functional
- `shared/layout/` — shell, topbar, sidebar remain standalone components
- `app.config.ts` — functional providers unchanged
- `app.ts` — `<router-outlet>` unchanged
- Services — `providedIn: 'root'` unchanged
- BFF / server — unchanged
- i18n keys — unchanged
- SCSS variable usage — unchanged (PrimeNG CSS vars)

---

## Self-Review

1. **Placeholder scan**: No TBDs. All module names, paths, and patterns are fully specified.
2. **Internal consistency**: NgModule declarations match routing module. `app.routes.ts` paths match module file names. Models extracted and imported in services/components.
3. **Scope**: 7 feature modules + 1 shared/core update + copilot-instructions update. Appropriate for a single implementation plan.
4. **Ambiguity**: `auth-callback` component remains standalone (it's in `core/`, not a feature module). Clarified in "What Is NOT Changing". Shell/topbar/sidebar remain standalone — they are layout infrastructure, not feature modules.
