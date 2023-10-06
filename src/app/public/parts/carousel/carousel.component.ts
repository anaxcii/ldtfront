import {Component, OnInit} from '@angular/core';
import {GalleriesService} from "../../../services/galleries/galleries.service";
import {Gallery} from "../../../services/galleries/gallery.model";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  galleries: any[] = [];

  constructor(private galleriesService: GalleriesService) { }

  ngOnInit(): void {
    this.galleriesService.getGalleries().subscribe((data: any) => {
      this.galleries = data;
    });
  }
  ;

}
