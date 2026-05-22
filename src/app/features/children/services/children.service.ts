import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs';

export interface Child {
  _id?: string;
  holyName: string;
  firstName: string;
  lastName: string;
  birthday?: string;
  address?: string;
  classID?: string;
}

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
