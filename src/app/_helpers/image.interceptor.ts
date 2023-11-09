import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable()
export class ImageInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Vérifiez si la requête concerne la création d'une galerie
    if (req.url.includes('/api/images')) {
      return next.handle(req).pipe(
        map((event) => {
          if (event instanceof HttpResponse && event.body && event.body['@id']) {
            // Crée une nouvelle réponse avec uniquement la propriété '@id'
            const id = event.body['@id'];
            return new HttpResponse({
              body: id,
              status: event.status
            });
          }
          return event;
        })
      );
    } else {
      // Si la requête ne concerne pas la création d'une galerie, laissez-la passer sans interception.
      return next.handle(req);
    }
  }
}

export const ImageInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ImageInterceptor,
  multi: true,
};
