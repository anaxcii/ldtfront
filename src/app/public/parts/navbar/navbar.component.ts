import { Component, OnInit } from '@angular/core';
import { TokenService } from "../../../_services/token.service";
import { NftService } from "../../../_services/nft.service";
import { Nft } from "../../../_interfaces/nft";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchTerm: string = '';
  filteredNfts: Nft[] = [];
  contenuPanier: { image: any, price: number, name: string }[] = [];

  constructor(
    private tokenService: TokenService,
    private nftService: NftService
  ) {}

  ngOnInit() {
    const panierData = localStorage.getItem('panier');
    this.contenuPanier = panierData ? JSON.parse(panierData) : [];

    this.getAllNfts();
  }

  logout(): void {
    this.tokenService.clearToken();
  }

  isUserLoggedIn(): boolean {
    return this.tokenService.isLogged();
  }
  getAllNfts(): void {
    this.nftService.getAllNfts().subscribe(
      (response: any) => {
        const hydraMember = 'hydra:member';
        const nfts = response[hydraMember] || [];
        this.filteredNfts = nfts;
      },
      (error) => {
        console.error('Erreur lors de la récupération des NFT', error);
      }
    );
  }

  onSearchChange(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;

    if (this.searchTerm.trim() !== '') {
      this.filteredNfts = this.filteredNfts.filter((nft) =>
        nft.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      // Si le champ de recherche est vide, réinitialisez la liste
      this.getAllNfts();
    }
  }

}
