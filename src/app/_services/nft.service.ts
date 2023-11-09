import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import {Nft} from "../_interfaces/nft";

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

  createNft(galleryId: string, nft: { name: string; image: string; }): Observable<Nft> {
    // Ajoutez le champ nftgallery avec l'@id de la galerie
    const nftData = {
      name: nft.name,
      image: nft.image,
      nftgallery: galleryId,
    };

    return this.http.post<Nft>(this.apiUrl, nftData);
  }
}
