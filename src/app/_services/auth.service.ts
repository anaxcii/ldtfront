import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ICredential} from "../_interfaces/credential";
import {IToken} from "../_interfaces/token";
import {Observable} from "rxjs";
import {IRegister} from "../_interfaces/register";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrlL: string = 'https://gaetanthomas.tech/auth';
  apiUrlR: string = 'https://gaetanthomas.tech/api/users';
  constructor(private http: HttpClient) { }

  login(credentials: ICredential):Observable<IToken> {
    return this.http.post<IToken>(this.apiUrlL,credentials)
  }

  register(credentials: IRegister):Observable<IRegister> {
    return this.http.post<IRegister>(this.apiUrlR,credentials)
  }
}
