import {Component, OnInit} from '@angular/core';
import {TokenService} from "../../../_services/token.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  contenuPanier: { name: string, price: number }[] = [];

  constructor(
    private tokenService : TokenService,
    ) {
  }
  ngOnInit() {
    const panierData = localStorage.getItem('panier');
    this.contenuPanier = panierData ? JSON.parse(panierData) : [];
  }


logout():void{
    this.tokenService.clearToken()
}
  isUserLoggedIn(): boolean {
    return this.tokenService.isLogged();
  }
}
