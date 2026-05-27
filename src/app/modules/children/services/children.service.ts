import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs';
import { Child } from '../models/child.model';

@Injectable({ providedIn: 'root' })
export class ChildrenService {
  private readonly http = inject(HttpClient);

  private readonly _children = signal<Child[]>([]);
  readonly children = this._children.asReadonly();

  private readonly _loading = signal(false);
  readonly loading = this._loading.asReadonly();

  getAll(page = 1): Observable<Child[]> {
    this._loading.set(true);
    return this.http.get<Child[]>(`/api/children/all/${page}`).pipe(
      tap(data  => { this._children.set(data); this._loading.set(false); }),
      catchError(err => { this._loading.set(false); throw err; }),
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
