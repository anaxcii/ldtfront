import { Component, OnInit } from "@angular/core";
import { UserService } from "../../_services/user.service";
import { GalleriesService } from "../../_services/galleries.service";
import { Gallery } from "../../_interfaces/gallery";
import { ImageService } from "../../_services/image.service";
import { NftService } from "../../_services/nft.service";
import {Nft} from "../../_interfaces/nft";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  gallery!: Gallery;
  nfts!: Nft[];
  isOwner = false;
  dataLoaded = false;
  NFTForm: any = {}; // Assurez-vous d'avoir une instance de formulaire NFTForm

  imageFile: File | null = null; // Ajout de la propriété imageFile pour le fichier image

  constructor(
    private userService: UserService,
    private galleriesService: GalleriesService,
    private imageService: ImageService,
    private nftService: NftService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.userService.getcurrentUser().subscribe((user: any) => {
      if (user && this.gallery && this.gallery.creator && user.username === this.gallery.creator.username) {
        this.isOwner = true;
      }
    });

    let id = parseInt(this.route.snapshot.paramMap.get('id') || '');
    this.galleriesService.getGalleries(id).subscribe((data: any) => {
      this.gallery = data;
      console.log(data);
    });

    this.nftService.getNftsByGalleries(id).subscribe((data: any) => {
      this.nfts = data['hydra:member'];
      console.log(data);
      this.dataLoaded = true; // Marquer les données comme chargées
    });
  }

  CreateNFTOnSubmit(): void {
    if (this.gallery && this.imageFile) {
      this.uploadImage(this.imageFile);
    } else {
      console.error('Veuillez sélectionner une image.');
    }
  }

  uploadImage(imageFile: File): void {
    this.imageService.uploadImage(imageFile).subscribe(
      (imagePath: string) => {
        if (this.gallery) {
          this.gallery.image = imagePath;
          console.log('Image de la galerie mise à jour :', imagePath);
          this.createNFT();
        }
      },
      (error) => {
        console.error('Erreur lors du téléchargement de l\'image :', error);
      }
    );
  }

  createNFT(): void {
    if (this.gallery && this.NFTForm.name && this.imageFile) {
      const nftData = {
        name: this.NFTForm.name,
        image: this.gallery.image, // Utilisez l'image de la galerie
      };

      this.nftService.createNft(this.gallery['@id'], nftData).subscribe(
        (createdNft: any) => {
          console.log('NFT créé :', createdNft);
          this.NFTForm = {};
        },
        (error) => {
          console.error('Erreur lors de la création du NFT :', error);
        }
      );
    }
    window.location.reload();
  }

  onImageFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
    }
  }

  deleteGallery() {
    if (this.isOwner) {
      const id = parseInt(this.route.snapshot.paramMap.get('id') || '');
      this.galleriesService.deleteGalleries(id).subscribe(() => {
        this.router.navigate(['/user']);
      });
    } else {
      console.log('Vous n\'avez pas les droits');
    }
  }

  ModifyGalleryOnSubmit(): void {
    if (this.gallery && this.gallery.id) {
      const modifiedGallery = {
        name: this.gallery.name,
        description: this.gallery.description,
      };

      this.galleriesService.modifyGallery(this.gallery.id, modifiedGallery).subscribe(
        (updatedGallery: Gallery) => {
          console.log('Gallery updated:', updatedGallery);
          // Optionally, you can update the local gallery object
          this.gallery = updatedGallery;
        },
        (error) => {
          console.error('Error updating gallery:', error);
        }
      );
    }
  }
}
