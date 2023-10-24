import {Component, OnInit} from '@angular/core';
import {IUser} from "../../_interfaces/user";
import {UserService} from "../../_services/user.service";



@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit{

    user: IUser | null = null;

    constructor(private userService: UserService) { }
    ngOnInit(): void {
        this.userService.getcurrentUser().subscribe((user: IUser) => {
            this.user = user;
            console.log(user);
        });
    }

}
