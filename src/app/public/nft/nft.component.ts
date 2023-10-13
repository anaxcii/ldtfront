import {Component, OnInit} from '@angular/core';
import {Nft} from "../../_interfaces/nft";
import {ActivatedRoute} from "@angular/router";
import {NftService} from "../../_services/nft.service";
import {CartService} from "../../_services/cart.service";

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.css']
})
export class NftComponent implements OnInit {
  nft!:Nft;
  contenuPanier: { name: string, price: number }[] = [];

  constructor(
    private route: ActivatedRoute,
    private nftService: NftService,
  ) {}


  ngOnInit(): void {
    const panierData = localStorage.getItem('panier');
    this.contenuPanier = panierData ? JSON.parse(panierData) : [];
    let id = parseInt(this.route.snapshot.paramMap.get('id') || '');
    this.nftService.getNft(id).subscribe((data: any) => {
      console.log("Nft",data);
      this.nft = data;
    });
  };
  ajouterAuPanier(nft: Nft) {
    // Vérifiez si le NFT est déjà présent dans le panier en fonction de sa position
    const existeDeja = this.contenuPanier.some(item => item === nft);

    if (!existeDeja) {
      this.contenuPanier.push(nft);
      localStorage.setItem('panier', JSON.stringify(this.contenuPanier));
    }
  }

}
