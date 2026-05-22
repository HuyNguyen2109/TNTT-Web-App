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
