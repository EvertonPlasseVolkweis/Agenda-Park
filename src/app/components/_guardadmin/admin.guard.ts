import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const usuario = localStorage.getItem("usuario");
    const usuarioFormatado = JSON.parse(usuario);
    if (usuarioFormatado.nivel_acesso === "admin") {
      return true;
    } else {
      this.router.navigate(['/', 'login']);
      return false;
    }
  }

}
