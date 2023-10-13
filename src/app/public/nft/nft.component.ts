import {Component, OnInit} from '@angular/core';
import {Nft} from "../../_interfaces/nft";
import {ActivatedRoute} from "@angular/router";
import {NftService} from "../../_services/nft.service";

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.css']
})
export class NftComponent implements OnInit {
  nft!:Nft;

  constructor(
    private route: ActivatedRoute,
    private nftService: NftService,
  ) {}

  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get('id') || '');
    this.nftService.getNft(id).subscribe((data: any) => {
      console.log("Nft",data);
      this.nft = data;
    });
  };
}
