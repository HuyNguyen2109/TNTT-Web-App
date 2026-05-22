import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs';

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
