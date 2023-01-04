import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { EvaluadorModel } from 'src/app/models/evaluador.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

	private usuarioAutenticado: boolean = false;

    mostrarMenuEmitter = new EventEmitter<boolean>();

   	constructor( private router: Router ) { }

   	fazerLogin(usuario: EvaluadorModel){

	    if (usuario.usuario === 'usuario@gmail.com' && 
	      usuario.password === '123456') {

	      this.usuarioAutenticado = true;

	      this.mostrarMenuEmitter.emit(true);

	      this.router.navigate(['/']);

	    } else {
	      this.usuarioAutenticado = false;

	      this.mostrarMenuEmitter.emit(false);
	    }
  	}

	  usuarioEstaAutenticado(){
	    return this.usuarioAutenticado;
	  }
}
