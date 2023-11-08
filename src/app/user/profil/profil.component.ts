import { Component, OnInit } from "@angular/core";
import { UserService } from "../../_services/user.service";
import { IUser } from "../../_interfaces/user";
import { GalleriesService } from "../../_services/galleries.service";
import { Gallery } from "../../_interfaces/gallery";


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  user?: IUser;
  form: Partial<IUser> = {};
  CollectionForm: Partial<Gallery> = {
    image: "/api/images/50",
    bannerImage: "/api/images/50",
    creator: "", // Laissez cette chaîne vide pour le moment
    dropdate: new Date().toISOString()
  };

  constructor(private userService: UserService, private galleriesService: GalleriesService) {}

  ngOnInit(): void {
    this.userService.getcurrentUser().subscribe((data: IUser) => {
      this.user = data;
      if (this.user) {
        this.CollectionForm.creator = "/api/users/" + this.user.id;
      }

    });
  }

  onSubmit(): void {
    if (this.user) {
      this.userService.patchUser(this.user.id, this.form).subscribe(
        (updatedUser: IUser) => {
          this.user = updatedUser;
          this.form = {};
          console.log('Données mises à jour :', updatedUser);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour :', error);
        }
      );
    }
  }

  CreateGalleryOnSubmit(): void {
    if (this.user) {
      this.galleriesService.createGalleries(this.CollectionForm).subscribe(
        (createdGallery: Gallery) => {
          console.log('Galerie créée :', createdGallery);
          this.CollectionForm = {  // Réinitialisez CollectionForm
            name: "",
            category: "",
            description: "",
          };
        },
        (error) => {
          console.error('Erreur lors de la création de la galerie :', error);
        });
    }
  }

}
