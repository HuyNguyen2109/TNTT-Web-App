import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs';
import { DocumentModel } from '../models/document.model';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  private readonly http = inject(HttpClient);

  private readonly _documents = signal<DocumentModel[]>([]);
  readonly documents = this._documents.asReadonly();

  private readonly _loading = signal(false);
  readonly loading = this._loading.asReadonly();

  getAll(): Observable<DocumentModel[]> {
    this._loading.set(true);
    return this.http.get<DocumentModel[]>('/api/document/all').pipe(
      tap(data  => { this._documents.set(data); this._loading.set(false); }),
      catchError(err => { this._loading.set(false); throw err; }),
    );
  }
}
