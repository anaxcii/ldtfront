import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";



@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit{

  constructor(private http: HttpClient) {
  }
  ngOnInit():void {
    this.http.get('http://51.254.112.67/api/users').subscribe(
      data => console.log(data),
      err => console.error(err)
    )
  }

}
