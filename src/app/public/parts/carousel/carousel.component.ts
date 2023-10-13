import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GalleriesService} from "../../../_services/galleries.service";
import {Gallery} from "../../../_interfaces/gallery";



@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  gallery!:Gallery;

  constructor(
    private route: ActivatedRoute,
    private galleriesService: GalleriesService,
  ) {}
  ngOnInit(): void {
    this.galleriesService.getAllGalleries().subscribe((data: any) => {
      console.log("Gallery",data);
      this.gallery = data;
    });

  }
}
