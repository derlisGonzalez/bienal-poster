import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean  {

    if ( this.auth.estaAutenticado() ) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
 
  }


  /*canActivate( route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot ) : Observable<boolean> | boolean {

    console.log('AuthGuard');

    return this.verificarAcesso();
  }*/


  /*private verificarAcesso(){
    if (this.authService.usuarioEstaAutenticado()){
      return true;
    } 

    this.router.navigate(['/login']);

    return false;
  }*/

  /*canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
    console.log('canLoad: verificando se usuário pode carregar o cod módulo');

    return this.verificarAcesso();
  }*/


}
