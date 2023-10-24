import { Component, OnInit } from '@angular/core';

import { AuthService } from "../../_services/auth.service";
import { IRegister } from "../../_interfaces/register";
import { Router } from '@angular/router'; // N'oubliez pas d'importer le Router

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: IRegister = {
    username: '',
    plainPassword: '',
    email: ''
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.form);

    this.authService.register(this.form).subscribe(
      (response) => {
        console.log('Utilisateur créé avec succès.', response);
        // Rediriger vers la page de connexion après une création réussie
        this.router.navigate(['/auth/login']);
      },
      (error) => {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
        // Gérer les erreurs ici (par exemple, afficher un message d'erreur à l'utilisateur).
      }
    );
  }
}
