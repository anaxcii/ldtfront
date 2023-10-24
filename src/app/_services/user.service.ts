import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUser} from "../_interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string = 'https://gaetanthomas.tech/api/currentUser';
  constructor(private http: HttpClient) { }

  getcurrentUser(): Observable<IUser> {
    return this.http.get<IUser>(this.apiUrl);
  }
}
