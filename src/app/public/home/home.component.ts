import {Component, OnInit} from '@angular/core';
import {Gallery} from "../../_interfaces/gallery";
import {ActivatedRoute} from "@angular/router";
import {GalleriesService} from "../../_services/galleries.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  gallery:Gallery[] = []

  constructor(
    private route: ActivatedRoute,
    private galleriesService: GalleriesService,
  ) {}
  ngOnInit(): void {
    this.galleriesService.getAllGalleries().subscribe((data: any) => {
      console.log("Gallery",data);
      this.gallery = data['hydra:member'];
    });

  }
}
