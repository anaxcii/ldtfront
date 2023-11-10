import {Component, OnInit} from '@angular/core';
import {Nft} from "../../_interfaces/nft";
import {ActivatedRoute} from "@angular/router";
import {NftService} from "../../_services/nft.service";
import { Location } from '@angular/common';
import {UserService} from "../../_services/user.service";

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.css']
})
export class NftComponent implements OnInit {
  nft!:Nft;
  contenuPanier: { name: string, price: number, id:number}[] = [];
  isOwner = false;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private nftService: NftService,
    private userService: UserService,
  ) {}


  ngOnInit(): void {
    this.userService.getcurrentUser().subscribe((user: any) => {
      if (user && user.username === this.nft.nftgallery.creator.username) {
        this.isOwner = true;
      }
    });

    const panierData = localStorage.getItem('panier');
    this.contenuPanier = panierData ? JSON.parse(panierData) : [];
    let id = parseInt(this.route.snapshot.paramMap.get('id') || '');
    this.nftService.getNft(id).subscribe((data: any) => {
      this.nft = data;
    });

  };
  ajouterAuPanier(nft: Nft) {
    // Vérifiez si le NFT est déjà présent dans le panier en fonction de son id
    const existeDeja = this.contenuPanier.some(item => item.id === nft.id);

    if (!existeDeja) {
      this.contenuPanier.push(nft);
      localStorage.setItem('panier', JSON.stringify(this.contenuPanier));
      window.location.reload();
    }
  }

  estDansLePanier(nft: Nft): boolean {
    return this.contenuPanier.some(item => item.id === nft.id);
  }


  deleteNFT() {
    if (this.isOwner) {
      const id = this.nft.id;
      this.nftService.deleteNft(id).subscribe(() => {
        console.log('NFT supprimé.');
        this.location.back();
      });
    } else {
      console.log('Vous ne pouvez pas supprimé cet NFT.');
    }
  }

}
