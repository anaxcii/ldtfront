import { Injectable } from '@angular/core';
import { Transaction } from "../_interfaces/transaction";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  apiUrl: string = 'https://gaetanthomas.tech/api/transactions';
  constructor(private http: HttpClient) { }

  getTransaction(id:number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl +'/'+ id );
  }

  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }

  getTransactionsByNftId(id: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}?nft_id=${id}`);
  }

}
