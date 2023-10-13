import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Gallery} from "../_interfaces/gallery";

@Injectable({
  providedIn: 'root'
})
export class GalleriesService {
  apiUrl: string = 'https://gaetanthomas.tech/api/galleries';
  constructor(private http: HttpClient) { }

  getGalleries(id: number): Observable<Gallery[]> {
    return this.http.get<Gallery[]>(this.apiUrl +'/'+ id );
  }

  getAllGalleries(): Observable<Gallery[]> {
    return this.http.get<Gallery[]>(this.apiUrl);
  }

}
