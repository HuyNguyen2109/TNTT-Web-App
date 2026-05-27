import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs';
import { Member } from '../models/member.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);

  private readonly _members = signal<Member[]>([]);
  readonly members = this._members.asReadonly();

  private readonly _loading = signal(false);
  readonly loading = this._loading.asReadonly();

  getAll(): Observable<Member[]> {
    this._loading.set(true);
    return this.http.get<Member[]>('/api/user/all').pipe(
      tap(data  => { this._members.set(data); this._loading.set(false); }),
      catchError(err => { this._loading.set(false); throw err; }),
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
