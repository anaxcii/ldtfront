import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {PublicRoutingModule} from "./public-routing.module";
import {FooterComponent} from "./parts/footer/footer.component";
import {CollectionComponent} from "./collection/collection.component";
import {ArtComponent} from "./category/art/art.component";
import {NavcarouselComponent} from "./parts/navcarousel/navcarousel.component";
import {PhotoComponent} from "./category/photo/photo.component";
import {GamingComponent} from "./category/gaming/gaming.component";
import {PfpsComponent} from "./category/pfps/pfps.component";
import { NftComponent } from './nft/nft.component';

@NgModule({
  declarations: [
    HomeComponent,
    FooterComponent,
    CollectionComponent,
    ArtComponent,
    NavcarouselComponent,
    PhotoComponent,
    GamingComponent,
    PfpsComponent,
    NftComponent,

  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
  ]
})
export class PublicModule { }
