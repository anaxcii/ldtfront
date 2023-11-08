import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {NavbarComponent} from "./public/parts/navbar/navbar.component";
import {TokenInterceptorProvider} from "./_helpers/token.interceptor";
import {ImageInterceptorProvider} from "./_helpers/image.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [TokenInterceptorProvider, ImageInterceptorProvider],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
