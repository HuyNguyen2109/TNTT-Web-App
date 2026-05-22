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
