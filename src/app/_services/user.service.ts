import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUser} from "../_interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrlcu: string = 'https://gaetanthomas.tech/api/currentUser';
  apiUrlu: string = 'https://gaetanthomas.tech/api/users';
  constructor(private http: HttpClient) { }

  getcurrentUser(): Observable<IUser> {
    return this.http.get<IUser>(this.apiUrlcu);
  }

  patchUser(userId: number, updatedUserData: Partial<IUser>): Observable<IUser> {
    // Configuration des en-têtes de la requête avec le type de média attendu par le serveur
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/merge-patch+json'
      })
    };

    // Envoi de la requête PATCH avec les en-têtes configurés
    return this.http.patch<IUser>(`${this.apiUrlu}/${userId}`, updatedUserData, httpOptions);
  }

  getUserById(userId: number): Observable<IUser> {
    const userUrl = `${this.apiUrlu}/${userId}`;
    return this.http.get<IUser>(userUrl);
  }

}
