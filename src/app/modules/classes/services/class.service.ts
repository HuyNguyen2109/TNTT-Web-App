import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs';
import { ClassModel } from '../models/class.model';

@Injectable({ providedIn: 'root' })
export class ClassService {
  private readonly http = inject(HttpClient);

  private readonly _classes = signal<ClassModel[]>([]);
  readonly classes = this._classes.asReadonly();

  private readonly _loading = signal(false);
  readonly loading = this._loading.asReadonly();

  getAll(): Observable<ClassModel[]> {
    this._loading.set(true);
    return this.http.get<ClassModel[]>('/api/class/all').pipe(
      tap(data  => { this._classes.set(data); this._loading.set(false); }),
      catchError(err => { this._loading.set(false); throw err; }),
    );
  }
}
