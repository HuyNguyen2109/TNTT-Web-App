import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs';
import { EventModel } from '../models/event.model';

@Injectable({ providedIn: 'root' })
export class EventService {
  private readonly http = inject(HttpClient);

  private readonly _events = signal<EventModel[]>([]);
  readonly events = this._events.asReadonly();

  private readonly _loading = signal(false);
  readonly loading = this._loading.asReadonly();

  getAll(): Observable<EventModel[]> {
    this._loading.set(true);
    return this.http.get<EventModel[]>('/api/event/all').pipe(
      tap(data  => { this._events.set(data); this._loading.set(false); }),
      catchError(err => { this._loading.set(false); throw err; }),
    );
  }
}
