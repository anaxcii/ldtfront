import { Component } from '@angular/core';
import {Gallery} from "../../../_interfaces/gallery";
import {GalleriesService} from "../../../_services/galleries.service";

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent {

  galleries: Gallery[] = [];

  constructor(private galleriesService: GalleriesService) {}

  ngOnInit() {
    this.getGalleries();
  }

  getGalleries() {
    this.galleriesService.getGalleriesByCategory('Photographie')
      .subscribe((data: any) => {
        this.galleries = data['hydra:member'].filter((gallery: any) => {
          return gallery.category === 'Photographie';
        });
      });
  }

}
