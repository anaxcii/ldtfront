import {Component, OnInit} from '@angular/core';
import {Nft} from "../../_interfaces/nft";
import {ActivatedRoute} from "@angular/router";
import {NftService} from "../../_services/nft.service";
import { Location } from '@angular/common';
import {UserService} from "../../_services/user.service";
import {Transaction} from "../../_interfaces/transaction";
import {TransactionService} from "../../_services/transaction.service";

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.css']
})
export class NftComponent implements OnInit {
  transactions: Transaction[] = [];
  nft!:Nft;
  contenuPanier: { name: string, currentOrder:{price_buy :number}, id:number}[] = [];
  isOwner:boolean = false;
  dataLoaded = false;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private nftService: NftService,
    private userService: UserService,
    private transactionService: TransactionService
  ) {}


  ngOnInit(): void {


    let id:number = parseInt(this.route.snapshot.paramMap.get('id') || '');

    this.nftService.getNft(id).subscribe((data: any) => {
      this.nft = data;
      this.userService.getcurrentUser().subscribe((user: any) => {
        if (user.username === this.nft.owner.username) {
          this.isOwner = true;
        }
      });

      this.transactionService.getTransactionsByNftId(id).subscribe((transactions: any) => {
        this.transactions = transactions['hydra:member'] || [];
      });
    });

    const panierData:string|null = localStorage.getItem('panier');
    this.contenuPanier = panierData ? JSON.parse(panierData) : [];

    this.dataLoaded = true;
  };

  ajouterAuPanier(nft: Nft):void {
    // Vérifiez si le NFT est déjà présent dans le panier en fonction de son id
    const existeDeja:boolean = this.contenuPanier.some(item => item.id === nft.id);

    if (!existeDeja) {
      this.contenuPanier.push(nft);
      localStorage.setItem('panier', JSON.stringify(this.contenuPanier));
      window.location.reload();
    }
  }

  estDansLePanier(nft: Nft): boolean {
    return this.contenuPanier.some(item => item.id === nft.id);
  }


  deleteNFT():void {
    if (this.isOwner) {
      const id = this.nft.id;
      this.nftService.deleteNft(id).subscribe(() => {
        this.location.back();
      });
    }
  }

  sellNFT():void {
    if (this.nft.price && this.nft.id) {
      this.nftService.sellNft(this.nft.id, this.nft.price).subscribe();
    }
  }

  acheterNFT() {
    if (this.nft && this.nft.id) {
      this.nftService.buyNft(this.nft.id).subscribe(
        (nft: Nft) => {

          console.log(nft);
        },
      );
    }
  }

  annulerVenteNft(id: number): void {
    this.nftService.cancelOrder(id).subscribe();
  }

}
