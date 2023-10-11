import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import {Gallery} from "../interfaces/gallery";

@Injectable({
  providedIn: 'root'
})
export class GalleriesService {
  apiUrl: string = 'http://51.254.112.67/api/galleries';
  constructor(private http: HttpClient) { }

  getGalleries(id: number): Observable<Gallery[]> {
    return this.http.get<Gallery[]>(this.apiUrl +'/'+ id );
  }

}
