import { Component, OnInit } from '@angular/core';
import { GalleriesService } from '../../../_services/galleries.service';
import {Gallery} from "../../../_interfaces/gallery";

@Component({
  selector: 'app-pfps',
  templateUrl: './pfps.component.html',
  styleUrls: ['./pfps.component.css']
})
export class PfpsComponent implements OnInit {
  galleries: Gallery[] = [];

  constructor(private galleriesService: GalleriesService) {}

  ngOnInit() {
    this.getGalleries();
  }

  getGalleries() {
    this.galleriesService.getGalleriesByCategory('PFPs')
      .subscribe((data: any) => {
        this.galleries = data['hydra:member'].filter((gallery: any) => {
          return gallery.category === 'PFPs';
        });
      });
  }

}
