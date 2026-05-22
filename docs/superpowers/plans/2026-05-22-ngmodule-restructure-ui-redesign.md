# NgModule Restructure + UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert all 7 feature areas from standalone lazy-loaded components to NgModule-based lazy modules, rename `features/` → `modules/`, extract inline templates to `.component.html` files, and improve UI with PrimeNG v19 patterns.

**Architecture:** `app.routes.ts` uses `loadChildren` pointing to each feature's `*.module.ts`. Each module has a `*-routing.module.ts` that provides `RouterModule.forChild()`. Components inside feature modules are NOT standalone — declared in the module. Core/Shared/Services remain standalone/functional as before.

**Tech Stack:** Angular 21, NgModule pattern (feature modules only), PrimeNG v19 (Aura theme), PrimeFlex, @ngx-translate/core, RxJS + Signals.

---

## File Map

**New files to create:**
```
src/app/modules/dashboard/
  components/main/dashboard.component.ts, .html, .scss
  models/dashboard-stats.model.ts
  services/              (empty folder — dashboard uses HttpClient directly)
  constants/             (empty folder)
  dashboard.module.ts
  dashboard-routing.module.ts

src/app/modules/children/
  components/main/children-list.component.ts, .html, .scss
  models/child.model.ts
  services/children.service.ts
  constants/
  children.module.ts
  children-routing.module.ts

[same pattern for: members, funds, classes, events, documents]
```

**Files to modify:**
- `src/app/app.routes.ts` — switch all feature routes to `loadChildren`
- `src/app/shared/layout/shell/shell.component.ts` — `templateUrl`
- `src/app/shared/layout/topbar/topbar.component.ts` — `templateUrl`
- `src/app/shared/layout/sidebar/sidebar.component.ts` — `templateUrl`
- `src/app/core/auth-callback/auth-callback.component.ts` — `templateUrl`
- `.github/copilot-instructions.md` — update sections 3 and 4

**Files to delete:**
- All of `src/app/features/` (entire directory)

---

## Task 1: Model files

**Files:**
- Create: `src/app/modules/children/models/child.model.ts`
- Create: `src/app/modules/members/models/member.model.ts`
- Create: `src/app/modules/funds/models/fund-entry.model.ts`
- Create: `src/app/modules/classes/models/class.model.ts`
- Create: `src/app/modules/events/models/event.model.ts`
- Create: `src/app/modules/documents/models/document.model.ts`
- Create: `src/app/modules/dashboard/models/dashboard-stats.model.ts`

- [ ] **Step 1: Create all model files**

```bash
mkdir -p src/app/modules/dashboard/{components/main,models,services,constants}
mkdir -p src/app/modules/children/{components/main,models,services,constants}
mkdir -p src/app/modules/members/{components/main,models,services,constants}
mkdir -p src/app/modules/funds/{components/main,models,services,constants}
mkdir -p src/app/modules/classes/{components/main,models,services,constants}
mkdir -p src/app/modules/events/{components/main,models,services,constants}
mkdir -p src/app/modules/documents/{components/main,models,services,constants}
```

`src/app/modules/dashboard/models/dashboard-stats.model.ts`:
```typescript
export interface DashboardStats {
  generalFund: number;
  orgFund: number;
  memberCount: number;
  childrenCount: number;
}
```

`src/app/modules/children/models/child.model.ts`:
```typescript
export interface Child {
  _id?: string;
  holyName: string;
  firstName: string;
  lastName: string;
  birthday?: string;
  address?: string;
  classID?: string;
}
```

`src/app/modules/members/models/member.model.ts`:
```typescript
export interface Member {
  _id?: string;
  username?: string;
  holyName: string;
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
  address?: string;
  birthday?: string;
  classID?: string;
}
```

`src/app/modules/funds/models/fund-entry.model.ts`:
```typescript
export interface FundEntry {
  _id?: string;
  amount: number;
  date?: string;
  note?: string;
  type?: 'income' | 'expense';
}

export interface FundSummary {
  childrenFund: FundEntry[];
  internalFund: FundEntry[];
}
```

`src/app/modules/classes/models/class.model.ts`:
```typescript
export interface ClassModel {
  _id?: string;
  classID?: string;
  className: string;
  teacherUsername?: string;
}
```

`src/app/modules/events/models/event.model.ts`:
```typescript
export interface EventModel {
  _id?: string;
  eventName: string;
  date?: string;
  description?: string;
}
```

`src/app/modules/documents/models/document.model.ts`:
```typescript
export interface DocumentModel {
  _id?: string;
  documentName: string;
  fileUrl?: string;
  uploadedAt?: string;
}
```

- [ ] **Step 2: Verify files exist**
```bash
ls src/app/modules/children/models/child.model.ts
ls src/app/modules/funds/models/fund-entry.model.ts
```
Expected: files listed, no errors.

---

## Task 2: Service files (updated imports)

**Files:**
- Create: `src/app/modules/children/services/children.service.ts`
- Create: `src/app/modules/members/services/user.service.ts`
- Create: `src/app/modules/funds/services/fund.service.ts`
- Create: `src/app/modules/classes/services/class.service.ts`
- Create: `src/app/modules/events/services/event.service.ts`
- Create: `src/app/modules/documents/services/document.service.ts`

- [ ] **Step 1: Create children service**

`src/app/modules/children/services/children.service.ts`:
```typescript
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs';
import { Child } from '../models/child.model';

@Injectable({ providedIn: 'root' })
export class ChildrenService {
  private http = inject(HttpClient);

  children = signal<Child[]>([]);
  loading  = signal(false);

  getAll(page = 1): Observable<Child[]> {
    this.loading.set(true);
    return this.http.get<Child[]>(`/api/children/all/${page}`).pipe(
      tap(data  => { this.children.set(data); this.loading.set(false); }),
      catchError(err => { this.loading.set(false); throw err; }),
    );
  }

  getByName(name: string): Observable<Child> {
    return this.http.get<Child>(`/api/children/by-name/${encodeURIComponent(name)}`);
  }

  create(child: Child): Observable<Child> {
    return this.http.post<Child>('/api/children/create', child);
  }

  update(name: string, child: Partial<Child>): Observable<Child> {
    return this.http.post<Child>(`/api/children/update/by-name/${encodeURIComponent(name)}`, child);
  }

  deleteByNames(names: string[]): Observable<void> {
    return this.http.delete<void>('/api/children/delete/by-names', { body: { names } });
  }

  count(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>('/api/children/count');
  }
}
```

- [ ] **Step 2: Create members service**

`src/app/modules/members/services/user.service.ts`:
```typescript
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs';
import { Member } from '../models/member.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);

  members = signal<Member[]>([]);
  loading  = signal(false);

  getAll(): Observable<Member[]> {
    this.loading.set(true);
    return this.http.get<Member[]>('/api/user/all').pipe(
      tap(data  => { this.members.set(data); this.loading.set(false); }),
      catchError(err => { this.loading.set(false); throw err; }),
    );
  }

  getByUsername(username: string): Observable<Member> {
    return this.http.get<Member>(`/api/user/get-user/${encodeURIComponent(username)}`);
  }

  create(member: Member): Observable<Member> {
    return this.http.post<Member>('/api/user/register', member);
  }

  update(member: Partial<Member>): Observable<Member> {
    return this.http.post<Member>('/api/user/update', member);
  }

  deleteByUsernames(usernames: string[]): Observable<void> {
    return this.http.delete<void>('/api/user/delete/by-usernames', { body: { usernames } });
  }
}
```

- [ ] **Step 3: Create funds service**

`src/app/modules/funds/services/fund.service.ts`:
```typescript
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, tap, catchError } from 'rxjs';
import { FundEntry, FundSummary } from '../models/fund-entry.model';

@Injectable({ providedIn: 'root' })
export class FundService {
  private http = inject(HttpClient);

  childrenFund = signal<FundEntry[]>([]);
  internalFund = signal<FundEntry[]>([]);
  loading      = signal(false);

  getAll(): Observable<FundSummary> {
    this.loading.set(true);
    return forkJoin({
      childrenFund: this.http.get<FundEntry[]>('/api/childrenFund'),
      internalFund: this.http.get<FundEntry[]>('/api/internalFund'),
    }).pipe(
      tap(({ childrenFund, internalFund }) => {
        this.childrenFund.set(childrenFund);
        this.internalFund.set(internalFund);
        this.loading.set(false);
      }),
      catchError(err => { this.loading.set(false); throw err; }),
    );
  }
}
```

- [ ] **Step 4: Create classes service**

`src/app/modules/classes/services/class.service.ts`:
```typescript
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs';
import { ClassModel } from '../models/class.model';

@Injectable({ providedIn: 'root' })
export class ClassService {
  private http = inject(HttpClient);

  classes  = signal<ClassModel[]>([]);
  loading  = signal(false);

  getAll(): Observable<ClassModel[]> {
    this.loading.set(true);
    return this.http.get<ClassModel[]>('/api/class/all').pipe(
      tap(data  => { this.classes.set(data); this.loading.set(false); }),
      catchError(err => { this.loading.set(false); throw err; }),
    );
  }
}
```

- [ ] **Step 5: Create events service**

`src/app/modules/events/services/event.service.ts`:
```typescript
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs';
import { EventModel } from '../models/event.model';

@Injectable({ providedIn: 'root' })
export class EventService {
  private http = inject(HttpClient);

  events  = signal<EventModel[]>([]);
  loading = signal(false);

  getAll(): Observable<EventModel[]> {
    this.loading.set(true);
    return this.http.get<EventModel[]>('/api/event/all').pipe(
      tap(data  => { this.events.set(data); this.loading.set(false); }),
      catchError(err => { this.loading.set(false); throw err; }),
    );
  }
}
```

- [ ] **Step 6: Create documents service**

`src/app/modules/documents/services/document.service.ts`:
```typescript
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs';
import { DocumentModel } from '../models/document.model';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  private http = inject(HttpClient);

  documents = signal<DocumentModel[]>([]);
  loading   = signal(false);

  getAll(): Observable<DocumentModel[]> {
    this.loading.set(true);
    return this.http.get<DocumentModel[]>('/api/document/all').pipe(
      tap(data  => { this.documents.set(data); this.loading.set(false); }),
      catchError(err => { this.loading.set(false); throw err; }),
    );
  }
}
```

---

## Task 3: Dashboard module

**Files:**
- Create: `src/app/modules/dashboard/components/main/dashboard.component.ts`
- Create: `src/app/modules/dashboard/components/main/dashboard.component.html`
- Create: `src/app/modules/dashboard/components/main/dashboard.component.scss`
- Create: `src/app/modules/dashboard/dashboard-routing.module.ts`
- Create: `src/app/modules/dashboard/dashboard.module.ts`

- [ ] **Step 1: Create dashboard routing module**

`src/app/modules/dashboard/dashboard-routing.module.ts`:
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/main/dashboard.component';

const routes: Routes = [{ path: '', component: DashboardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
```

- [ ] **Step 2: Create dashboard component class**

`src/app/modules/dashboard/components/main/dashboard.component.ts`:
```typescript
import { Component, inject, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, catchError, of } from 'rxjs';
import { DashboardStats } from '../../models/dashboard-stats.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private http = inject(HttpClient);

  loading = signal(true);
  stats = signal<DashboardStats | null>(null);

  ngOnInit(): void {
    forkJoin({
      childrenFund: this.http.get<any>('/api/childrenFund').pipe(catchError(() => of(null))),
      internalFund: this.http.get<any>('/api/internalFund').pipe(catchError(() => of(null))),
      members:      this.http.get<any[]>('/api/user/all').pipe(catchError(() => of([]))),
      children:     this.http.get<any>('/api/children/count').pipe(catchError(() => of(null))),
    }).subscribe(({ childrenFund, internalFund, members, children }) => {
      this.stats.set({
        generalFund:   childrenFund?.total  ?? 0,
        orgFund:       internalFund?.total  ?? 0,
        memberCount:   Array.isArray(members) ? members.length : 0,
        childrenCount: children?.count      ?? 0,
      });
      this.loading.set(false);
    });
  }
}
```

- [ ] **Step 3: Create dashboard HTML template**

`src/app/modules/dashboard/components/main/dashboard.component.html`:
```html
@if (loading()) {
  <div class="dashboard__loading">
    <p-progressSpinner />
  </div>
} @else {
  <div class="dashboard__grid">

    <p-card styleClass="stat-card stat-card--blue">
      <div class="stat-card__body">
        <div class="stat-card__icon-wrap stat-card__icon-wrap--blue">
          <span class="pi pi-wallet"></span>
        </div>
        <div class="stat-card__info">
          <div class="stat-card__value">{{ stats()?.generalFund | number }}</div>
          <div class="stat-card__label">{{ 'DASHBOARD.GENERAL_FUND' | translate }}</div>
        </div>
      </div>
    </p-card>

    <p-card styleClass="stat-card stat-card--green">
      <div class="stat-card__body">
        <div class="stat-card__icon-wrap stat-card__icon-wrap--green">
          <span class="pi pi-building"></span>
        </div>
        <div class="stat-card__info">
          <div class="stat-card__value">{{ stats()?.orgFund | number }}</div>
          <div class="stat-card__label">{{ 'DASHBOARD.ORG_FUND' | translate }}</div>
        </div>
      </div>
    </p-card>

    <p-card styleClass="stat-card stat-card--orange">
      <div class="stat-card__body">
        <div class="stat-card__icon-wrap stat-card__icon-wrap--orange">
          <span class="pi pi-id-card"></span>
        </div>
        <div class="stat-card__info">
          <div class="stat-card__value">{{ stats()?.memberCount }}</div>
          <div class="stat-card__label">{{ 'DASHBOARD.MEMBER_COUNT' | translate }}</div>
        </div>
      </div>
    </p-card>

    <p-card styleClass="stat-card stat-card--purple">
      <div class="stat-card__body">
        <div class="stat-card__icon-wrap stat-card__icon-wrap--purple">
          <span class="pi pi-users"></span>
        </div>
        <div class="stat-card__info">
          <div class="stat-card__value">{{ stats()?.childrenCount }}</div>
          <div class="stat-card__label">{{ 'DASHBOARD.CHILDREN_COUNT' | translate }}</div>
        </div>
      </div>
    </p-card>

  </div>
}
```

- [ ] **Step 4: Create dashboard SCSS**

`src/app/modules/dashboard/components/main/dashboard.component.scss`:
```scss
.dashboard {
  &__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60vh;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1.5rem;
  }
}

.stat-card {
  &__body {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    padding: 0.5rem 0;
  }

  &__icon-wrap {
    width: 56px;
    height: 56px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    flex-shrink: 0;

    &--blue   { background: #dbeafe; color: #1d4ed8; }
    &--green  { background: #dcfce7; color: #15803d; }
    &--orange { background: #ffedd5; color: #c2410c; }
    &--purple { background: #ede9fe; color: #6d28d9; }
  }

  &__value {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--text-color);
    line-height: 1;
  }

  &__label {
    font-size: 0.875rem;
    color: var(--text-color-secondary);
    margin-top: 0.35rem;
  }
}
```

- [ ] **Step 5: Create dashboard NgModule**

`src/app/modules/dashboard/dashboard.module.ts`:
```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/main/dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TranslateModule,
    CardModule,
    ProgressSpinnerModule,
  ],
})
export class DashboardModule {}
```

---

## Task 4: Children module

**Files:**
- Create: `src/app/modules/children/components/main/children-list.component.ts`
- Create: `src/app/modules/children/components/main/children-list.component.html`
- Create: `src/app/modules/children/components/main/children-list.component.scss`
- Create: `src/app/modules/children/children-routing.module.ts`
- Create: `src/app/modules/children/children.module.ts`

- [ ] **Step 1: Create routing module**

`src/app/modules/children/children-routing.module.ts`:
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenListComponent } from './components/main/children-list.component';

const routes: Routes = [{ path: '', component: ChildrenListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChildrenRoutingModule {}
```

- [ ] **Step 2: Create component class**

`src/app/modules/children/components/main/children-list.component.ts`:
```typescript
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ChildrenService } from '../../services/children.service';

@Component({
  selector: 'app-children-list',
  templateUrl: './children-list.component.html',
  styleUrl: './children-list.component.scss',
  providers: [MessageService],
})
export class ChildrenListComponent implements OnInit {
  @ViewChild('tableRef') tableRef!: Table;
  service = inject(ChildrenService);

  ngOnInit(): void {
    this.service.getAll(1).subscribe();
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.tableRef.filterGlobal(value, 'contains');
  }
}
```

- [ ] **Step 3: Create HTML template**

`src/app/modules/children/components/main/children-list.component.html`:
```html
<p-toolbar styleClass="page-toolbar">
  <ng-template pTemplate="start">
    <h2 class="page-title">{{ 'CHILDREN.TITLE' | translate }}</h2>
  </ng-template>
  <ng-template pTemplate="end">
    <p-iconfield>
      <p-inputicon styleClass="pi pi-search" />
      <input
        pInputText
        type="text"
        [placeholder]="'COMMON.SEARCH' | translate"
        (input)="onSearch($event)"
      />
    </p-iconfield>
    <p-button
      icon="pi pi-plus"
      [label]="'CHILDREN.ADD_NEW' | translate"
      severity="success"
      styleClass="ml-2"
    />
  </ng-template>
</p-toolbar>

@if (service.loading()) {
  <div class="loading-center"><p-progressSpinner /></div>
} @else {
  <p-table
    #tableRef
    [value]="service.children()"
    [paginator]="true"
    [rows]="20"
    [rowsPerPageOptions]="[10, 20, 50]"
    styleClass="p-datatable-gridlines p-datatable-striped p-datatable-sm"
    [globalFilterFields]="['holyName','firstName','lastName']"
  >
    <ng-template pTemplate="header">
      <tr>
        <th pSortableColumn="holyName">
          {{ 'CHILDREN.HOLY_NAME' | translate }}
          <p-sortIcon field="holyName" />
        </th>
        <th pSortableColumn="lastName">
          {{ 'CHILDREN.FULL_NAME' | translate }}
          <p-sortIcon field="lastName" />
        </th>
        <th>{{ 'CHILDREN.BIRTHDAY' | translate }}</th>
        <th>{{ 'CHILDREN.CLASS' | translate }}</th>
        <th style="width: 6rem"></th>
      </tr>
    </ng-template>
    <ng-template pTemplate="body" let-child>
      <tr>
        <td>{{ child.holyName }}</td>
        <td>{{ child.firstName }} {{ child.lastName }}</td>
        <td>{{ child.birthday }}</td>
        <td>{{ child.classID }}</td>
        <td>
          <p-button icon="pi pi-pencil" [text]="true" severity="info" />
          <p-button icon="pi pi-trash" [text]="true" severity="danger" />
        </td>
      </tr>
    </ng-template>
    <ng-template pTemplate="emptymessage">
      <tr>
        <td colspan="5" class="text-center">{{ 'COMMON.NO_DATA' | translate }}</td>
      </tr>
    </ng-template>
  </p-table>
}
```

- [ ] **Step 4: Create SCSS**

`src/app/modules/children/components/main/children-list.component.scss`:
```scss
.page-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
}

.loading-center {
  display: flex;
  justify-content: center;
  padding: 4rem 0;
}

::ng-deep .page-toolbar {
  border-radius: 0 !important;
  border-left: none !important;
  border-right: none !important;
  border-top: none !important;
  margin-bottom: 1rem;
}
```

- [ ] **Step 5: Create NgModule**

`src/app/modules/children/children.module.ts`:
```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToolbarModule } from 'primeng/toolbar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

import { ChildrenRoutingModule } from './children-routing.module';
import { ChildrenListComponent } from './components/main/children-list.component';

@NgModule({
  declarations: [ChildrenListComponent],
  imports: [
    CommonModule,
    ChildrenRoutingModule,
    TranslateModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ProgressSpinnerModule,
    ToolbarModule,
    IconFieldModule,
    InputIconModule,
  ],
})
export class ChildrenModule {}
```

---

## Task 5: Members module

**Files:**
- Create: `src/app/modules/members/components/main/members-list.component.ts`
- Create: `src/app/modules/members/components/main/members-list.component.html`
- Create: `src/app/modules/members/components/main/members-list.component.scss`
- Create: `src/app/modules/members/members-routing.module.ts`
- Create: `src/app/modules/members/members.module.ts`

- [ ] **Step 1: Create routing module**

`src/app/modules/members/members-routing.module.ts`:
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembersListComponent } from './components/main/members-list.component';

const routes: Routes = [{ path: '', component: MembersListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembersRoutingModule {}
```

- [ ] **Step 2: Create component class**

`src/app/modules/members/components/main/members-list.component.ts`:
```typescript
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrl: './members-list.component.scss',
  providers: [MessageService],
})
export class MembersListComponent implements OnInit {
  @ViewChild('tableRef') tableRef!: Table;
  service = inject(UserService);

  ngOnInit(): void {
    this.service.getAll().subscribe();
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.tableRef.filterGlobal(value, 'contains');
  }
}
```

- [ ] **Step 3: Create HTML template**

`src/app/modules/members/components/main/members-list.component.html`:
```html
<p-toolbar styleClass="page-toolbar">
  <ng-template pTemplate="start">
    <h2 class="page-title">{{ 'MEMBERS.TITLE' | translate }}</h2>
  </ng-template>
  <ng-template pTemplate="end">
    <p-iconfield>
      <p-inputicon styleClass="pi pi-search" />
      <input
        pInputText
        type="text"
        [placeholder]="'COMMON.SEARCH' | translate"
        (input)="onSearch($event)"
      />
    </p-iconfield>
    <p-button
      icon="pi pi-plus"
      [label]="'MEMBERS.ADD_NEW' | translate"
      severity="success"
      styleClass="ml-2"
    />
  </ng-template>
</p-toolbar>

@if (service.loading()) {
  <div class="loading-center"><p-progressSpinner /></div>
} @else {
  <p-table
    #tableRef
    [value]="service.members()"
    [paginator]="true"
    [rows]="20"
    [rowsPerPageOptions]="[10, 20, 50]"
    styleClass="p-datatable-gridlines p-datatable-striped p-datatable-sm"
    [globalFilterFields]="['holyName','firstName','lastName','email','phone']"
  >
    <ng-template pTemplate="header">
      <tr>
        <th pSortableColumn="holyName">
          {{ 'MEMBERS.HOLY_NAME' | translate }}
          <p-sortIcon field="holyName" />
        </th>
        <th pSortableColumn="lastName">
          {{ 'MEMBERS.FULL_NAME' | translate }}
          <p-sortIcon field="lastName" />
        </th>
        <th>{{ 'MEMBERS.PHONE' | translate }}</th>
        <th>{{ 'MEMBERS.EMAIL' | translate }}</th>
        <th style="width: 6rem"></th>
      </tr>
    </ng-template>
    <ng-template pTemplate="body" let-member>
      <tr>
        <td>{{ member.holyName }}</td>
        <td>{{ member.firstName }} {{ member.lastName }}</td>
        <td>{{ member.phone }}</td>
        <td>{{ member.email }}</td>
        <td>
          <p-button icon="pi pi-pencil" [text]="true" severity="info" />
          <p-button icon="pi pi-trash" [text]="true" severity="danger" />
        </td>
      </tr>
    </ng-template>
    <ng-template pTemplate="emptymessage">
      <tr>
        <td colspan="5" class="text-center">{{ 'COMMON.NO_DATA' | translate }}</td>
      </tr>
    </ng-template>
  </p-table>
}
```

- [ ] **Step 4: Create SCSS**

`src/app/modules/members/components/main/members-list.component.scss`:
```scss
.page-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
}

.loading-center {
  display: flex;
  justify-content: center;
  padding: 4rem 0;
}

::ng-deep .page-toolbar {
  border-radius: 0 !important;
  border-left: none !important;
  border-right: none !important;
  border-top: none !important;
  margin-bottom: 1rem;
}
```

- [ ] **Step 5: Create NgModule**

`src/app/modules/members/members.module.ts`:
```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToolbarModule } from 'primeng/toolbar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

import { MembersRoutingModule } from './members-routing.module';
import { MembersListComponent } from './components/main/members-list.component';

@NgModule({
  declarations: [MembersListComponent],
  imports: [
    CommonModule,
    MembersRoutingModule,
    TranslateModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ProgressSpinnerModule,
    ToolbarModule,
    IconFieldModule,
    InputIconModule,
  ],
})
export class MembersModule {}
```

---

## Task 6: Funds module

**Files:**
- Create: `src/app/modules/funds/components/main/funds-list.component.ts`
- Create: `src/app/modules/funds/components/main/funds-list.component.html`
- Create: `src/app/modules/funds/components/main/funds-list.component.scss`
- Create: `src/app/modules/funds/funds-routing.module.ts`
- Create: `src/app/modules/funds/funds.module.ts`

- [ ] **Step 1: Create routing module**

`src/app/modules/funds/funds-routing.module.ts`:
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FundsListComponent } from './components/main/funds-list.component';

const routes: Routes = [{ path: '', component: FundsListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FundsRoutingModule {}
```

- [ ] **Step 2: Create component class**

`src/app/modules/funds/components/main/funds-list.component.ts`:
```typescript
import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FundService } from '../../services/fund.service';

@Component({
  selector: 'app-funds-list',
  templateUrl: './funds-list.component.html',
  styleUrl: './funds-list.component.scss',
  providers: [MessageService],
})
export class FundsListComponent implements OnInit {
  service = inject(FundService);

  ngOnInit(): void {
    this.service.getAll().subscribe();
  }
}
```

- [ ] **Step 3: Create HTML template**

`src/app/modules/funds/components/main/funds-list.component.html`:
```html
<p-toolbar styleClass="page-toolbar">
  <ng-template pTemplate="start">
    <h2 class="page-title">{{ 'FUNDS.TITLE' | translate }}</h2>
  </ng-template>
  <ng-template pTemplate="end">
    <p-button
      icon="pi pi-plus"
      [label]="'FUNDS.ADD_ENTRY' | translate"
      severity="success"
    />
  </ng-template>
</p-toolbar>

@if (service.loading()) {
  <div class="loading-center"><p-progressSpinner /></div>
} @else {
  <p-tabs>
    <p-tablist>
      <p-tab value="children">{{ 'FUNDS.CHILDREN_FUND' | translate }}</p-tab>
      <p-tab value="internal">{{ 'FUNDS.INTERNAL_FUND' | translate }}</p-tab>
    </p-tablist>
    <p-tabpanels>

      <p-tabpanel value="children">
        <p-table
          [value]="service.childrenFund()"
          [paginator]="true"
          [rows]="20"
          styleClass="p-datatable-gridlines p-datatable-striped p-datatable-sm"
        >
          <ng-template pTemplate="header">
            <tr>
              <th>{{ 'FUNDS.DATE' | translate }}</th>
              <th>{{ 'FUNDS.AMOUNT' | translate }}</th>
              <th>{{ 'FUNDS.NOTE' | translate }}</th>
              <th style="width: 6rem"></th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-entry>
            <tr>
              <td>{{ entry.date }}</td>
              <td>{{ entry.amount | number }}</td>
              <td>{{ entry.note }}</td>
              <td>
                <p-button icon="pi pi-pencil" [text]="true" severity="info" />
                <p-button icon="pi pi-trash" [text]="true" severity="danger" />
              </td>
            </tr>
          </ng-template>
        </p-table>
      </p-tabpanel>

      <p-tabpanel value="internal">
        <p-table
          [value]="service.internalFund()"
          [paginator]="true"
          [rows]="20"
          styleClass="p-datatable-gridlines p-datatable-striped p-datatable-sm"
        >
          <ng-template pTemplate="header">
            <tr>
              <th>{{ 'FUNDS.DATE' | translate }}</th>
              <th>{{ 'FUNDS.AMOUNT' | translate }}</th>
              <th>{{ 'FUNDS.NOTE' | translate }}</th>
              <th style="width: 6rem"></th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-entry>
            <tr>
              <td>{{ entry.date }}</td>
              <td>{{ entry.amount | number }}</td>
              <td>{{ entry.note }}</td>
              <td>
                <p-button icon="pi pi-pencil" [text]="true" severity="info" />
                <p-button icon="pi pi-trash" [text]="true" severity="danger" />
              </td>
            </tr>
          </ng-template>
        </p-table>
      </p-tabpanel>

    </p-tabpanels>
  </p-tabs>
}
```

- [ ] **Step 4: Create SCSS**

`src/app/modules/funds/components/main/funds-list.component.scss`:
```scss
.page-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
}

.loading-center {
  display: flex;
  justify-content: center;
  padding: 4rem 0;
}

::ng-deep .page-toolbar {
  border-radius: 0 !important;
  border-left: none !important;
  border-right: none !important;
  border-top: none !important;
  margin-bottom: 1rem;
}
```

- [ ] **Step 5: Create NgModule**

`src/app/modules/funds/funds.module.ts`:
```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToolbarModule } from 'primeng/toolbar';
import { TabsModule } from 'primeng/tabs';

import { FundsRoutingModule } from './funds-routing.module';
import { FundsListComponent } from './components/main/funds-list.component';

@NgModule({
  declarations: [FundsListComponent],
  imports: [
    CommonModule,
    FundsRoutingModule,
    TranslateModule,
    TableModule,
    ButtonModule,
    ProgressSpinnerModule,
    ToolbarModule,
    TabsModule,
  ],
})
export class FundsModule {}
```

---

## Task 7: Classes module

**Files:**
- Create: `src/app/modules/classes/components/main/classes-list.component.ts`
- Create: `src/app/modules/classes/components/main/classes-list.component.html`
- Create: `src/app/modules/classes/components/main/classes-list.component.scss`
- Create: `src/app/modules/classes/classes-routing.module.ts`
- Create: `src/app/modules/classes/classes.module.ts`

- [ ] **Step 1: Create routing module**

`src/app/modules/classes/classes-routing.module.ts`:
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassesListComponent } from './components/main/classes-list.component';

const routes: Routes = [{ path: '', component: ClassesListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassesRoutingModule {}
```

- [ ] **Step 2: Create component class**

`src/app/modules/classes/components/main/classes-list.component.ts`:
```typescript
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ClassService } from '../../services/class.service';

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrl: './classes-list.component.scss',
  providers: [MessageService],
})
export class ClassesListComponent implements OnInit {
  @ViewChild('tableRef') tableRef!: Table;
  service = inject(ClassService);

  ngOnInit(): void {
    this.service.getAll().subscribe();
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.tableRef.filterGlobal(value, 'contains');
  }
}
```

- [ ] **Step 3: Create HTML template**

`src/app/modules/classes/components/main/classes-list.component.html`:
```html
<p-toolbar styleClass="page-toolbar">
  <ng-template pTemplate="start">
    <h2 class="page-title">{{ 'CLASSES.TITLE' | translate }}</h2>
  </ng-template>
  <ng-template pTemplate="end">
    <p-iconfield>
      <p-inputicon styleClass="pi pi-search" />
      <input
        pInputText
        type="text"
        [placeholder]="'COMMON.SEARCH' | translate"
        (input)="onSearch($event)"
      />
    </p-iconfield>
    <p-button
      icon="pi pi-plus"
      [label]="'CLASSES.ADD_NEW' | translate"
      severity="success"
      styleClass="ml-2"
    />
  </ng-template>
</p-toolbar>

@if (service.loading()) {
  <div class="loading-center"><p-progressSpinner /></div>
} @else {
  <p-table
    #tableRef
    [value]="service.classes()"
    [paginator]="true"
    [rows]="20"
    [rowsPerPageOptions]="[10, 20, 50]"
    styleClass="p-datatable-gridlines p-datatable-striped p-datatable-sm"
    [globalFilterFields]="['className','teacherUsername']"
  >
    <ng-template pTemplate="header">
      <tr>
        <th pSortableColumn="className">
          {{ 'CLASSES.CLASS_NAME' | translate }}
          <p-sortIcon field="className" />
        </th>
        <th>{{ 'CLASSES.TEACHER' | translate }}</th>
        <th style="width: 6rem"></th>
      </tr>
    </ng-template>
    <ng-template pTemplate="body" let-cls>
      <tr>
        <td>{{ cls.className }}</td>
        <td>{{ cls.teacherUsername }}</td>
        <td>
          <p-button icon="pi pi-pencil" [text]="true" severity="info" />
          <p-button icon="pi pi-trash" [text]="true" severity="danger" />
        </td>
      </tr>
    </ng-template>
    <ng-template pTemplate="emptymessage">
      <tr>
        <td colspan="3" class="text-center">{{ 'COMMON.NO_DATA' | translate }}</td>
      </tr>
    </ng-template>
  </p-table>
}
```

- [ ] **Step 4: Create SCSS**

`src/app/modules/classes/components/main/classes-list.component.scss`:
```scss
.page-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
}

.loading-center {
  display: flex;
  justify-content: center;
  padding: 4rem 0;
}

::ng-deep .page-toolbar {
  border-radius: 0 !important;
  border-left: none !important;
  border-right: none !important;
  border-top: none !important;
  margin-bottom: 1rem;
}
```

- [ ] **Step 5: Create NgModule**

`src/app/modules/classes/classes.module.ts`:
```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToolbarModule } from 'primeng/toolbar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

import { ClassesRoutingModule } from './classes-routing.module';
import { ClassesListComponent } from './components/main/classes-list.component';

@NgModule({
  declarations: [ClassesListComponent],
  imports: [
    CommonModule,
    ClassesRoutingModule,
    TranslateModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ProgressSpinnerModule,
    ToolbarModule,
    IconFieldModule,
    InputIconModule,
  ],
})
export class ClassesModule {}
```

---

## Task 8: Events module

**Files:**
- Create: `src/app/modules/events/components/main/events-list.component.ts`
- Create: `src/app/modules/events/components/main/events-list.component.html`
- Create: `src/app/modules/events/components/main/events-list.component.scss`
- Create: `src/app/modules/events/events-routing.module.ts`
- Create: `src/app/modules/events/events.module.ts`

- [ ] **Step 1: Create routing module**

`src/app/modules/events/events-routing.module.ts`:
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsListComponent } from './components/main/events-list.component';

const routes: Routes = [{ path: '', component: EventsListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsRoutingModule {}
```

- [ ] **Step 2: Create component class**

`src/app/modules/events/components/main/events-list.component.ts`:
```typescript
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.scss',
  providers: [MessageService],
})
export class EventsListComponent implements OnInit {
  @ViewChild('tableRef') tableRef!: Table;
  service = inject(EventService);

  ngOnInit(): void {
    this.service.getAll().subscribe();
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.tableRef.filterGlobal(value, 'contains');
  }
}
```

- [ ] **Step 3: Create HTML template**

`src/app/modules/events/components/main/events-list.component.html`:
```html
<p-toolbar styleClass="page-toolbar">
  <ng-template pTemplate="start">
    <h2 class="page-title">{{ 'EVENTS.TITLE' | translate }}</h2>
  </ng-template>
  <ng-template pTemplate="end">
    <p-iconfield>
      <p-inputicon styleClass="pi pi-search" />
      <input
        pInputText
        type="text"
        [placeholder]="'COMMON.SEARCH' | translate"
        (input)="onSearch($event)"
      />
    </p-iconfield>
    <p-button
      icon="pi pi-plus"
      [label]="'EVENTS.ADD_NEW' | translate"
      severity="success"
      styleClass="ml-2"
    />
  </ng-template>
</p-toolbar>

@if (service.loading()) {
  <div class="loading-center"><p-progressSpinner /></div>
} @else {
  <p-table
    #tableRef
    [value]="service.events()"
    [paginator]="true"
    [rows]="20"
    [rowsPerPageOptions]="[10, 20, 50]"
    styleClass="p-datatable-gridlines p-datatable-striped p-datatable-sm"
    [globalFilterFields]="['eventName','description']"
  >
    <ng-template pTemplate="header">
      <tr>
        <th pSortableColumn="eventName">
          {{ 'EVENTS.NAME' | translate }}
          <p-sortIcon field="eventName" />
        </th>
        <th>{{ 'EVENTS.DATE' | translate }}</th>
        <th>{{ 'EVENTS.DESCRIPTION' | translate }}</th>
        <th style="width: 6rem"></th>
      </tr>
    </ng-template>
    <ng-template pTemplate="body" let-event>
      <tr>
        <td>{{ event.eventName }}</td>
        <td>{{ event.date }}</td>
        <td>{{ event.description }}</td>
        <td>
          <p-button icon="pi pi-pencil" [text]="true" severity="info" />
          <p-button icon="pi pi-trash" [text]="true" severity="danger" />
        </td>
      </tr>
    </ng-template>
    <ng-template pTemplate="emptymessage">
      <tr>
        <td colspan="4" class="text-center">{{ 'COMMON.NO_DATA' | translate }}</td>
      </tr>
    </ng-template>
  </p-table>
}
```

- [ ] **Step 4: Create SCSS**

`src/app/modules/events/components/main/events-list.component.scss`:
```scss
.page-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
}

.loading-center {
  display: flex;
  justify-content: center;
  padding: 4rem 0;
}

::ng-deep .page-toolbar {
  border-radius: 0 !important;
  border-left: none !important;
  border-right: none !important;
  border-top: none !important;
  margin-bottom: 1rem;
}
```

- [ ] **Step 5: Create NgModule**

`src/app/modules/events/events.module.ts`:
```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToolbarModule } from 'primeng/toolbar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

import { EventsRoutingModule } from './events-routing.module';
import { EventsListComponent } from './components/main/events-list.component';

@NgModule({
  declarations: [EventsListComponent],
  imports: [
    CommonModule,
    EventsRoutingModule,
    TranslateModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ProgressSpinnerModule,
    ToolbarModule,
    IconFieldModule,
    InputIconModule,
  ],
})
export class EventsModule {}
```

---

## Task 9: Documents module

**Files:**
- Create: `src/app/modules/documents/components/main/documents-list.component.ts`
- Create: `src/app/modules/documents/components/main/documents-list.component.html`
- Create: `src/app/modules/documents/components/main/documents-list.component.scss`
- Create: `src/app/modules/documents/documents-routing.module.ts`
- Create: `src/app/modules/documents/documents.module.ts`

- [ ] **Step 1: Create routing module**

`src/app/modules/documents/documents-routing.module.ts`:
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsListComponent } from './components/main/documents-list.component';

const routes: Routes = [{ path: '', component: DocumentsListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentsRoutingModule {}
```

- [ ] **Step 2: Create component class**

`src/app/modules/documents/components/main/documents-list.component.ts`:
```typescript
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrl: './documents-list.component.scss',
  providers: [MessageService],
})
export class DocumentsListComponent implements OnInit {
  @ViewChild('tableRef') tableRef!: Table;
  service = inject(DocumentService);

  ngOnInit(): void {
    this.service.getAll().subscribe();
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.tableRef.filterGlobal(value, 'contains');
  }
}
```

- [ ] **Step 3: Create HTML template**

`src/app/modules/documents/components/main/documents-list.component.html`:
```html
<p-toolbar styleClass="page-toolbar">
  <ng-template pTemplate="start">
    <h2 class="page-title">{{ 'DOCUMENTS.TITLE' | translate }}</h2>
  </ng-template>
  <ng-template pTemplate="end">
    <p-iconfield>
      <p-inputicon styleClass="pi pi-search" />
      <input
        pInputText
        type="text"
        [placeholder]="'COMMON.SEARCH' | translate"
        (input)="onSearch($event)"
      />
    </p-iconfield>
    <p-button
      icon="pi pi-upload"
      [label]="'DOCUMENTS.UPLOAD' | translate"
      severity="success"
      styleClass="ml-2"
    />
  </ng-template>
</p-toolbar>

@if (service.loading()) {
  <div class="loading-center"><p-progressSpinner /></div>
} @else {
  <p-table
    #tableRef
    [value]="service.documents()"
    [paginator]="true"
    [rows]="20"
    [rowsPerPageOptions]="[10, 20, 50]"
    styleClass="p-datatable-gridlines p-datatable-striped p-datatable-sm"
    [globalFilterFields]="['documentName']"
  >
    <ng-template pTemplate="header">
      <tr>
        <th pSortableColumn="documentName">
          {{ 'DOCUMENTS.NAME' | translate }}
          <p-sortIcon field="documentName" />
        </th>
        <th>{{ 'DOCUMENTS.UPLOAD_DATE' | translate }}</th>
        <th style="width: 8rem">{{ 'DOCUMENTS.DOWNLOAD' | translate }}</th>
      </tr>
    </ng-template>
    <ng-template pTemplate="body" let-doc>
      <tr>
        <td>{{ doc.documentName }}</td>
        <td>{{ doc.uploadedAt }}</td>
        <td>
          <p-button icon="pi pi-download" [text]="true" severity="info" />
          <p-button icon="pi pi-trash" [text]="true" severity="danger" />
        </td>
      </tr>
    </ng-template>
    <ng-template pTemplate="emptymessage">
      <tr>
        <td colspan="3" class="text-center">{{ 'COMMON.NO_DATA' | translate }}</td>
      </tr>
    </ng-template>
  </p-table>
}
```

- [ ] **Step 4: Create SCSS**

`src/app/modules/documents/components/main/documents-list.component.scss`:
```scss
.page-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
}

.loading-center {
  display: flex;
  justify-content: center;
  padding: 4rem 0;
}

::ng-deep .page-toolbar {
  border-radius: 0 !important;
  border-left: none !important;
  border-right: none !important;
  border-top: none !important;
  margin-bottom: 1rem;
}
```

- [ ] **Step 5: Create NgModule**

`src/app/modules/documents/documents.module.ts`:
```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToolbarModule } from 'primeng/toolbar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentsListComponent } from './components/main/documents-list.component';

@NgModule({
  declarations: [DocumentsListComponent],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    TranslateModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ProgressSpinnerModule,
    ToolbarModule,
    IconFieldModule,
    InputIconModule,
  ],
})
export class DocumentsModule {}
```

---

## Task 10: Update app.routes.ts

**Files:**
- Modify: `src/app/app.routes.ts`

- [ ] **Step 1: Replace feature routes with loadChildren pointing to NgModules**

Replace the entire content of `src/app/app.routes.ts` with:

```typescript
import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { ShellComponent } from './shared/layout/shell/shell.component';

export const routes: Routes = [
  {
    path: 'callback',
    loadComponent: () =>
      import('./core/auth-callback/auth-callback.component').then(
        m => m.AuthCallbackComponent,
      ),
  },

  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'children',
        loadChildren: () =>
          import('./modules/children/children.module').then(m => m.ChildrenModule),
      },
      {
        path: 'members',
        loadChildren: () =>
          import('./modules/members/members.module').then(m => m.MembersModule),
      },
      {
        path: 'funds',
        loadChildren: () =>
          import('./modules/funds/funds.module').then(m => m.FundsModule),
      },
      {
        path: 'classes',
        loadChildren: () =>
          import('./modules/classes/classes.module').then(m => m.ClassesModule),
      },
      {
        path: 'events',
        loadChildren: () =>
          import('./modules/events/events.module').then(m => m.EventsModule),
      },
      {
        path: 'documents',
        loadChildren: () =>
          import('./modules/documents/documents.module').then(m => m.DocumentsModule),
      },
    ],
  },

  { path: '**', redirectTo: 'dashboard' },
];
```

---

## Task 11: Extract shared layout templates to HTML files

**Files:**
- Modify: `src/app/shared/layout/shell/shell.component.ts` → add `templateUrl`
- Create: `src/app/shared/layout/shell/shell.component.html`
- Modify: `src/app/shared/layout/topbar/topbar.component.ts` → add `templateUrl`
- Create: `src/app/shared/layout/topbar/topbar.component.html`
- Modify: `src/app/shared/layout/sidebar/sidebar.component.ts` → add `templateUrl`
- Create: `src/app/shared/layout/sidebar/sidebar.component.html`
- Modify: `src/app/core/auth-callback/auth-callback.component.ts` → add `templateUrl`
- Create: `src/app/core/auth-callback/auth-callback.component.html`

- [ ] **Step 1: Shell component**

`src/app/shared/layout/shell/shell.component.ts` (replace `template:` with `templateUrl:`):
```typescript
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { ToastModule } from 'primeng/toast';
import { TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-shell',
  imports: [RouterOutlet, SidebarComponent, TopbarComponent, ToastModule],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {
  constructor() {
    inject(TranslateService).use('vi');
  }
}
```

`src/app/shared/layout/shell/shell.component.html`:
```html
<p-toast />
<div class="shell">
  <app-sidebar />
  <div class="shell__content">
    <app-topbar />
    <main class="shell__main">
      <router-outlet />
    </main>
  </div>
</div>
```

- [ ] **Step 2: Topbar component**

`src/app/shared/layout/topbar/topbar.component.ts`:
```typescript
import { Component, inject } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-topbar',
  imports: [ToolbarModule, ButtonModule, AvatarModule, TooltipModule, TranslateModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  auth = inject(AuthService);

  userInitial(): string {
    const name = this.auth.currentUser()?.displayName ?? '';
    return name.charAt(0).toUpperCase() || 'U';
  }
}
```

`src/app/shared/layout/topbar/topbar.component.html`:
```html
<p-toolbar styleClass="topbar">
  <ng-template pTemplate="end">
    <div class="topbar__user">
      <p-avatar
        [label]="userInitial()"
        shape="circle"
        styleClass="topbar__avatar"
      />
      <span class="topbar__name">{{ auth.currentUser()?.displayName }}</span>
      <p-button
        icon="pi pi-sign-out"
        [text]="true"
        severity="secondary"
        [pTooltip]="'NAV.LOGOUT' | translate"
        (onClick)="auth.logout()"
      />
    </div>
  </ng-template>
</p-toolbar>
```

- [ ] **Step 3: Sidebar component**

`src/app/shared/layout/sidebar/sidebar.component.ts`:
```typescript
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TranslateModule } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [RouterLink, PanelMenuModule, TranslateModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    { label: 'Thông tin chung', icon: 'pi pi-home',      routerLink: '/dashboard'  },
    { label: 'Thiếu Nhi',      icon: 'pi pi-users',     routerLink: '/children'   },
    { label: 'Giáo Lý Viên',   icon: 'pi pi-id-card',   routerLink: '/members'    },
    { label: 'Quỹ',            icon: 'pi pi-wallet',    routerLink: '/funds'      },
    { label: 'Lớp',            icon: 'pi pi-book',      routerLink: '/classes'    },
    { label: 'Sự kiện',        icon: 'pi pi-calendar',  routerLink: '/events'     },
    { label: 'Tài liệu',       icon: 'pi pi-file',      routerLink: '/documents'  },
  ];
}
```

`src/app/shared/layout/sidebar/sidebar.component.html`:
```html
<nav class="sidebar">
  <div class="sidebar__logo">
    <span class="pi pi-star-fill sidebar__logo-icon"></span>
    <span class="sidebar__org">Xứ Đoàn</span>
  </div>
  <p-panelMenu [model]="menuItems" styleClass="sidebar__menu" />
</nav>
```

- [ ] **Step 4: Auth-callback component**

`src/app/core/auth-callback/auth-callback.component.ts`:
```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
})
export class AuthCallbackComponent implements OnInit {
  ngOnInit(): void {
    // BFF handles the redirect to '/' — nothing to do here.
  }
}
```

`src/app/core/auth-callback/auth-callback.component.html`:
```html
<div style="display:flex;align-items:center;justify-content:center;height:100vh;">
  <p>Đang xác thực, vui lòng chờ…</p>
</div>
```

---

## Task 12: Add COMMON.NO_DATA i18n key

**Files:**
- Modify: `src/assets/i18n/vi.json`

- [ ] **Step 1: Check current i18n file and add missing key**

```bash
cat src/assets/i18n/vi.json
```

Add `"NO_DATA": "Không có dữ liệu"` under the `"COMMON"` key. If the file has:
```json
{
  "COMMON": {
    "SEARCH": "Tìm kiếm"
  }
}
```
Update to:
```json
{
  "COMMON": {
    "SEARCH": "Tìm kiếm",
    "NO_DATA": "Không có dữ liệu"
  }
}
```

---

## Task 13: Delete old features/ directory

**Files:**
- Delete: `src/app/features/` (entire directory)

- [ ] **Step 1: Remove the old directory**

```bash
rm -rf src/app/features/
```

- [ ] **Step 2: Verify it's gone**

```bash
ls src/app/features/ 2>&1
```
Expected: `ls: cannot access 'src/app/features/': No such file or directory`

---

## Task 14: Run build and verify

- [ ] **Step 1: Run the Angular production build**

```bash
npm run build
```

Expected: `Application bundle generation complete` with no errors.
If there are TypeScript errors about missing imports or unknown components, check:
- All NgModule `declarations[]` match the component class names
- All imports in modules include every PrimeNG module used in the template
- `CommonModule` is imported in every NgModule (needed for `@if`, `| number`, etc.)

- [ ] **Step 2: Run unit tests**

```bash
npm test
```

Expected: 2 tests pass (`should create the app`, `should render a router outlet`).

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: restructure features/ to modules/ with NgModule pattern, extract templates, redesign UI

- Rename src/app/features/ → src/app/modules/
- Convert all feature components from standalone to NgModule-declared
- Add <module>.module.ts + <module>-routing.module.ts per feature
- Extract models from service files to dedicated models/ files
- Extract all inline templates to .component.html files
- UI: p-toolbar headers with p-iconfield search on all list pages
- UI: redesigned stat cards on dashboard (coloured icon badges)
- UI: p-datatable-gridlines + p-datatable-sm styleClass on all tables
- Shared layout components (shell, topbar, sidebar) get templateUrl

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

## Self-Review

**1. Spec coverage:**
- ✅ External HTML template files — all components use `templateUrl`
- ✅ PrimeNG v19 UI redesign — `p-toolbar`, `p-iconfield`, `p-inputicon`, improved stat cards, `p-datatable-sm`
- ✅ `features/` → `modules/` rename
- ✅ Each sub-module: `components/main/`, `constants/`, `models/`, `services/`
- ✅ `.module.ts` file for each sub-module
- ✅ `-routing.module.ts` file for each sub-module

**2. Placeholder scan:** None found. All code blocks contain complete implementations.

**3. Type consistency:**
- `Child` defined in Task 1, used in Task 2 (children service) and Task 4 (component)
- `Member` defined in Task 1, used in Task 2 (user service) and Task 5 (component)
- `FundEntry`/`FundSummary` defined in Task 1, used in Task 2 (fund service) and Task 6 (component)
- `ClassModel` defined in Task 1, used in Task 2 and Task 7
- `EventModel` defined in Task 1, used in Task 2 and Task 8
- `DocumentModel` defined in Task 1, used in Task 2 and Task 9
- `DashboardStats` defined in Task 1, used in Task 3
- All service property names match component usage: `service.children()`, `service.members()`, `service.classes()`, `service.events()`, `service.documents()`, `service.childrenFund()`, `service.internalFund()`
