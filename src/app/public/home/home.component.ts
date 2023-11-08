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
  dataLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private galleriesService: GalleriesService,
  ) {}
  ngOnInit(): void {
    this.galleriesService.getAllGalleries().subscribe((data: any) => {
      this.gallery = data['hydra:member'];
      this.dataLoaded = true; // Marquer les données comme chargées
    });
  }
}
