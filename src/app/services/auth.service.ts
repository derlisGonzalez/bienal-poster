import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';


import { EvaluadorModel } from 'src/app/models/evaluador.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

	private url = 'https://angular-bienal-default-rtdb.firebaseio.com';


	private usuarioAutenticado: boolean = false;

    mostrarMenuEmitter = new EventEmitter<boolean>();

   	constructor( private router: Router,
   				 private http: HttpClient  ) {


	}


   	fazerLogin(usuario: EvaluadorModel){

	    if (usuario.usuario === 'us' && 
	      usuario.password === '123') {

	      this.usuarioAutenticado = true;

	      this.mostrarMenuEmitter.emit(true);

	      this.router.navigate(['/']);

	    } else {
	      this.usuarioAutenticado = false;

	      this.mostrarMenuEmitter.emit(false);
	    }
  	}

  	getUsuarios() {
    return this.http.get(`${ this.url }/evaluadores.json`)
    .pipe(
      map( this.crearArreglo ),
      delay(500)
    );
  }


    private crearArreglo( evaluadoresObj: object ) {

    const evaluadores: EvaluadorModel[] = [];

    if ( evaluadoresObj === null ) { return []; }

    Object.keys( evaluadoresObj ).forEach( key => {

      const evaluador: EvaluadorModel = evaluadoresObj[key];
      evaluador.id = key;

      //if (evaluador.rol === "administrador") {
        evaluadores.push( evaluador );
     // }
      
    });


    return evaluadores;

  }

	usuarioEstaAutenticado(){
	  return this.usuarioAutenticado;
	}



}
