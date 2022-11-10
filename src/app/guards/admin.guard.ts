import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private auth: UserService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // console.info("route", route);
    // console.info("state", state);
    if (this.auth.currentUser) {
      this.auth.traerUsuarioUID(this.auth.currentUser.uid).then((response) => {
        console.log(response.perfil);
        if (response.perfil == "Admin") {

          return true;
        }
        else {
          this.router.navigateByUrl("/bienvenida");
          return false;
        }
      }).catch(e => { console.log(e) });

    }
    else {
      this.router.navigateByUrl("/ingreso");
      return false;
    }
    return false;
  }

}
