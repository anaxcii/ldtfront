import { Component } from '@angular/core';
import {Gallery} from "../../../_interfaces/gallery";
import {GalleriesService} from "../../../_services/galleries.service";

@Component({
  selector: 'app-gaming',
  templateUrl: './gaming.component.html',
  styleUrls: ['./gaming.component.css']
})
export class GamingComponent {

  galleries: Gallery[] = [];

  constructor(private galleriesService: GalleriesService) {}

  ngOnInit() {
    this.getGalleries();
  }

  getGalleries() {
    this.galleriesService.getGalleriesByCategory('Gaming')
      .subscribe((data: any) => {
        this.galleries = data['hydra:member'].filter((gallery: any) => {
          return gallery.category === 'Gaming';
        });
      });
  }

}
