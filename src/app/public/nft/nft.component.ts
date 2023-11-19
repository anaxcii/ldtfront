import {Component, OnInit} from '@angular/core';
import {Nft} from "../../_interfaces/nft";
import {ActivatedRoute} from "@angular/router";
import {NftService} from "../../_services/nft.service";
import { Location } from '@angular/common';
import {UserService} from "../../_services/user.service";
import {Transaction} from "../../_interfaces/transaction";
import {TransactionService} from "../../_services/transaction.service";
import {HttpClient} from "@angular/common/http";

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
  ethPriceInEuros: number = 0;

  constructor(
    private location: Location,
    private nftService: NftService,
    private userService: UserService,
    private transactionService: TransactionService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}


  ngOnInit(): void {

    let id:number = parseInt(this.route.snapshot.paramMap.get('id') || '');

    this.nftService.getNft(id).subscribe((data: any) => {
      this.nft = data;
      this.getEthPriceInEuros();
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
      location.reload();
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

  sellNFT(): void {
    if (this.nft.price && this.nft.id) {
      this.nftService.sellNft(this.nft.id, this.nft.price).subscribe(() => {
        location.reload();
      });
    }
  }

  acheterNFT() {
    if (this.nft && this.nft.id) {
      this.nftService.buyNft(this.nft.id).subscribe(
        (nft: Nft) => {
          setTimeout(() => {
            location.reload();
          }, 1000);
        },
      );
    }
  }


  annulerVenteNft(id: number): void {
    this.nftService.cancelOrder(id).subscribe();
    location.reload();
  }

  getEthPriceInEuros() {
    this.http.get<any>('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=EUR')
      .subscribe(data => {
        if (data && data.EUR) {
          this.ethPriceInEuros = data.EUR;
        }
      });
  }

  calculateTotalPrice(): number {
    // Calculer le prix total en euros en multipliant le prix de l'ETH en euros par nft.currentOrder?.price_buy
    return this.ethPriceInEuros * (this.nft.currentOrder?.price_buy || 0);
  }

}
