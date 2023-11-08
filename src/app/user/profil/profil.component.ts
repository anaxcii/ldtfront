import { Component, OnInit } from "@angular/core";
import { UserService } from "../../_services/user.service";
import { IUser } from "../../_interfaces/user";
import { GalleriesService } from "../../_services/galleries.service";
import { Gallery } from "../../_interfaces/gallery";
import { ImageService } from "../../_services/image.service";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  user?: IUser;
  form: Partial<IUser> = {};
  CollectionForm: Partial<Gallery> = {
    creator: "", // Laissez cette chaîne vide pour le moment
    dropdate: new Date().toISOString(),
  };

  imageFile: File | null = null; // Ajout de la propriété imageFile pour le fichier image
  bannerImageFile: File | null = null; // Ajout de la propriété bannerImageFile pour le fichier de la bannière

  constructor(
    private userService: UserService,
    private galleriesService: GalleriesService,
    private imageService: ImageService
  ) {}

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
      if (this.imageFile) {
        this.uploadImage(this.imageFile);
      } else {
        console.error('Veuillez sélectionner une image.');
      }
    }
  }

  uploadImage(imageFile: File): void {
    this.imageService.uploadImage(imageFile).subscribe(
      (imagePath: string) => {
        this.CollectionForm.image = imagePath;

        if (this.bannerImageFile) {
          this.uploadBannerImage(this.bannerImageFile);
        } else {
          console.error('Veuillez sélectionner une bannière.');
        }
      },
      (error) => {
        console.error('Erreur lors du téléchargement de l\'image :', error);
      }
    );
  }

  uploadBannerImage(bannerImageFile: File): void {
    this.imageService.uploadImage(bannerImageFile).subscribe(
      (bannerImagePath: string) => {
        this.CollectionForm.bannerImage = bannerImagePath;

        // Appelez la méthode pour créer la galerie ici
        this.createGallery();
      },
      (error) => {
        console.error('Erreur lors du téléchargement de la bannière :', error);
      }
    );
  }

  createGallery(): void {
    // Créez la galerie maintenant que les deux images sont téléchargées
    this.galleriesService.createGalleries(this.CollectionForm).subscribe(
      (createdGallery: Gallery) => {
        console.log('Galerie créée :', createdGallery);
        this.CollectionForm = {
          name: "",
          category: "",
          description: "",
        };
      },
      (error) => {
        console.error('Erreur lors de la création de la galerie :', error);
      }
    );
  }

  onImageFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
    }
  }

  onBannerImageFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.bannerImageFile = event.target.files[0];
    }
  }
}
