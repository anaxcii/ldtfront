import {Component, OnInit} from '@angular/core';
import {Gallery} from "../../interfaces/gallery";
import {ActivatedRoute} from "@angular/router";
import {GalleriesService} from "../../services/galleries.service";
import {NftService} from "../../services/nft.service";
import {Nft} from "../../interfaces/nft";




@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  gallery!:Gallery;
  nfts!:Nft[];

  constructor(
    private route: ActivatedRoute,
    private galleriesService: GalleriesService,
    private nftService: NftService
  ) {}

  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get('id') || '');
    this.galleriesService.getGalleries(id).subscribe((data: any) => {
      console.log("Gallery",data);
      this.gallery = data;
    });
    this.nftService.getNftsByGalleries(id).subscribe((data: any) => {
      console.log("NFT",data);
      this.nfts = data['hydra:member'];
    });

  };
}
