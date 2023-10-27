import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../_services/auth.service";
import {ICredential} from "../../_interfaces/credential";
import { TokenService } from '../../_services/token.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  form:ICredential = {
    username: '',
    password : ''
  };
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void{
    console.log(this.form)
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenService.saveToken(data.token)
      },
      err => {
        this.errorMessage = "Nom d'utilisateur ou Mot de passe invalide"; // Définissez le message d'erreur
        this.form.password = ''; // Supprimez le mot de passe saisi
        console.log(err);
      }
    )
  }
}
