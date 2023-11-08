import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Image } from "../_interfaces/image";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  apiUrl: string = 'https://gaetanthomas.tech/api/images';

  constructor(private http: HttpClient) { }

  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<string>(this.apiUrl, formData);
  }

}
