import {UserService} from "../../_services/user.service";
import {IUser} from "../../_interfaces/user";
import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  user: IUser | null = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getcurrentUser().subscribe((data: any) => {
      this.user = data;
      console.log(data);
    });
  }
}
