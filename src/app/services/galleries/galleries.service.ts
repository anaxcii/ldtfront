import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gallery } from './gallery.model';
@Injectable({
  providedIn: 'root'
})

export class GalleriesService {
  private apiUrl = 'https://127.0.0.1:8000/api/galleries';

  constructor(private http: HttpClient) { }

  getGalleries(): Observable<Gallery[]> {
    return this.http.get<Gallery[]>(this.apiUrl);
  }
}
