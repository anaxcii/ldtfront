import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject} from "@angular/core";
import {TokenService} from "../_services/token.service";


export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {


  return inject(TokenService).isLogged() ? true : inject(Router).createUrlTree(['auth']);
};
