import { Component } from '@angular/core';
import {Gallery} from "../../../_interfaces/gallery";
import {GalleriesService} from "../../../_services/galleries.service";

@Component({
  selector: 'app-art',
  templateUrl: './art.component.html',
  styleUrls: ['./art.component.css']
})
export class ArtComponent {

  galleries: Gallery[] = [];

  constructor(private galleriesService: GalleriesService) {}

  ngOnInit() {
    this.getGalleries();
  }

  getGalleries() {
    this.galleriesService.getGalleriesByCategory('Art')
      .subscribe((data: any) => {
        this.galleries = data['hydra:member'].filter((gallery: any) => {
          return gallery.category === 'Art';
        });
      });
  }

}
