import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import {Nft} from "../interfaces/nft";
import {Gallery} from "../interfaces/gallery";


@Injectable({
  providedIn: 'root'
})
export class NftService {
  apiUrl: string = 'http://51.254.112.67/api/nfts';
  constructor(private http: HttpClient) { }

  getNft(id:number): Observable<Nft[]> {
    return this.http.get<Nft[]>(this.apiUrl +'/'+ id );
  }
  getNftsByGalleries(id:number): Observable<Nft[]> {
    let queryParams = {"nftgallery":id.toString()};
    return this.http.get<Nft[]>(this.apiUrl, {params:queryParams});
  }
}
