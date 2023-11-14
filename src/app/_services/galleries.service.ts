import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Gallery} from "../_interfaces/gallery";

@Injectable({
  providedIn: 'root'
})
export class GalleriesService {
  apiUrl: string = 'https://gaetanthomas.tech/api/galleries';

  CollectionForm: Partial<Gallery> = {
    image: '',
    bannerImage: '',
    creator: "", // Laissez cette chaîne vide pour le moment
    dropdate: new Date().toISOString()
  };
  constructor(private http: HttpClient) { }

  getGalleries(id: number): Observable<Gallery[]> {
    return this.http.get<Gallery[]>(this.apiUrl +'/'+ id );
  }

  createGalleries(gallery: Partial<Gallery>): Observable<Gallery> {
    return this.http.post<Gallery>(this.apiUrl, gallery);
  }

  deleteGalleries(id: number): Observable<Gallery[]> {
    return this.http.delete<Gallery[]>(this.apiUrl +'/'+ id );
  }

  getAllGalleries(): Observable<Gallery[]> {
    return this.http.get<Gallery[]>(this.apiUrl);
  }

  getGalleriesByCategory(category: string): Observable<Gallery[]> {
    return this.http.get<Gallery[]>(`${this.apiUrl}?category=${category}`);
  }

  modifyGallery(id: number, modifiedGallery: Partial<Gallery>): Observable<Gallery> {
    // Spécifiez le type de contenu "application/merge-patch+json"
    const headers = new HttpHeaders({ 'Content-Type': 'application/merge-patch+json' });
    return this.http.patch<Gallery>(`${this.apiUrl}/${id}`, modifiedGallery, { headers });
  }

}
