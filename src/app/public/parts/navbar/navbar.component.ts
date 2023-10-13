import {Component, OnInit} from '@angular/core';
import {TokenService} from "../../../_services/token.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(private tokenService : TokenService) {
  }
ngOnInit():void {
}

logout():void{
    this.tokenService.clearToken()
}
  isUserLoggedIn(): boolean {
    return this.tokenService.isLogged();
  }
}
