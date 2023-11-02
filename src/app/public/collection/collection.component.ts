import { Component, OnInit } from '@angular/core';
import { Gallery } from "../../_interfaces/gallery";
import {ActivatedRoute, Router} from "@angular/router";
import { GalleriesService } from "../../_services/galleries.service";
import { NftService } from "../../_services/nft.service";
import { Nft } from "../../_interfaces/nft";
import {UserService} from "../../_services/user.service";

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  gallery!: Gallery;
  nfts!: Nft[];
  isOwner = false;

  constructor(
    private route: ActivatedRoute,
    private galleriesService: GalleriesService,
    private nftService: NftService,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {

    this.userService.getcurrentUser().subscribe((user: any) => {
      if (user && this.gallery && this.gallery.creator && user.username === this.gallery.creator.username) {
        this.isOwner = true;
      }
    });

    let id = parseInt(this.route.snapshot.paramMap.get('id') || '');
    this.galleriesService.getGalleries(id).subscribe((data: any) => {
      this.gallery = data;
    });

    this.nftService.getNftsByGalleries(id).subscribe((data: any) => {
      this.nfts = data['hydra:member'];
    });
  }

  deleteGallery() {
    if (this.isOwner) {
      const id = parseInt(this.route.snapshot.paramMap.get('id') || '');
      this.galleriesService.deleteGalleries(id).subscribe(() => {
        this.router.navigate(['/user']);
      });
    } else {
      console.log('Vous n\'avez pas les droits');
    }
  }
}
