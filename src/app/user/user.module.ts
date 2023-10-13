import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilComponent } from './profil/profil.component';
import {UserRoutingModule} from "./user-routing.module";



@NgModule({
  declarations: [
    ProfilComponent,

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
  ]
})
export class UserModule { }
