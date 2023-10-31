import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import {Nft} from "../_interfaces/nft";
import {Gallery} from "../_interfaces/gallery";


@Injectable({
  providedIn: 'root'
})
export class NftService {
  apiUrl: string = 'https://gaetanthomas.tech/api/nfts';
  constructor(private http: HttpClient) { }

  getNft(id:number): Observable<Nft[]> {
    return this.http.get<Nft[]>(this.apiUrl +'/'+ id );
  }

  deleteNft(id:number): Observable<Nft[]> {
    return this.http.delete<Nft[]>(this.apiUrl +'/'+ id );
  }


  getNftsByGalleries(id:number): Observable<Nft[]> {
    let queryParams = {"nftgallery":id.toString()};
    return this.http.get<Nft[]>(this.apiUrl, {params:queryParams});
  }
}
