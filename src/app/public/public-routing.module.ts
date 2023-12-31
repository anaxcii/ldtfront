import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CollectionComponent} from "./collection/collection.component";
import {ArtComponent} from "./category/art/art.component";
import {PhotoComponent} from "./category/photo/photo.component";
import {GamingComponent} from "./category/gaming/gaming.component";
import {PfpsComponent} from "./category/pfps/pfps.component";
import {NftComponent} from "./nft/nft.component";
import {FaqComponent} from "./faq/faq.component";



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'collection/:id', component: CollectionComponent },
  { path: 'category/art', component: ArtComponent },
  { path: 'category/photo', component: PhotoComponent },
  { path: 'category/gaming', component: GamingComponent },
  { path: 'category/pfps', component: PfpsComponent },
  { path: 'nft/:id', component: NftComponent },
  { path: 'faq', component: FaqComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
