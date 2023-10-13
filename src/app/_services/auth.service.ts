import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ICredential} from "../_interfaces/credential";
import {IToken} from "../_interfaces/token";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = 'https://gaetanthomas.tech/auth';
  constructor(private http: HttpClient) { }

  login(credentials: ICredential):Observable<IToken> {
    return this.http.post<IToken>(this.apiUrl,credentials)
  }
}