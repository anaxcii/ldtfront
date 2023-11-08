import { Injectable } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GalleriesService } from '../_services/galleries.service';

@Injectable()
export class ImageInterceptor implements HttpInterceptor {
  constructor(private galleriesService: GalleriesService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url === 'https://gaetanthomas.tech/api/images') {
      // Interceptez les requêtes vers votre service d'images
      return next.handle(request).pipe(
        switchMap((response: any) => {
          if (response.filePath) {
            // Mettez à jour le formulaire de création de galerie
            this.galleriesService.updateCollectionFormImages(response.filePath);
            console.log(response.filePath);
          }
          return of(response); // Retournez 'of(response)' pour créer un observable
        })
      );
    } else {
      return next.handle(request);
    }
  }
}

export const ImageInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ImageInterceptor,
  multi: true
}
