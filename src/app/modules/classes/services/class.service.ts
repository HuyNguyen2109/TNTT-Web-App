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
