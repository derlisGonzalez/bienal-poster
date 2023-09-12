import { UserService } from 'src/app/services/user.service';
import { UsuarioModel } from './../models/usuario.model';
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';


import { EvaluadorModel } from 'src/app/models/evaluador.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private urlUser = 'https://identitytoolkit.googleapis.com/v1/accounts';
  //private apikey = 'AIzaSyAhw373ikLLXTpBIAL2Bz3Qy9WdbKA67J0';
  //Get user https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=[API_KEY]
  private create = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAhw373ikLLXTpBIAL2Bz3Qy9WdbKA67J0';
  private loginUser = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAhw373ikLLXTpBIAL2Bz3Qy9WdbKA67J0';

  private getUser = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAhw373ikLLXTpBIAL2Bz3Qy9WdbKA67J0'

	private url = 'https://angular-bienal-default-rtdb.firebaseio.com';

  userToken: string;


	private usuarioAutenticado: boolean = false;

  mostrarMenuEmitter = new EventEmitter<boolean>();

  //CREAR NUEVO USUARIO
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]


  //Sign in with LOGIN
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]



  constructor( private router: Router, private http: HttpClient, private userService: UserService ) {
    this.leerToken();
	}

  
  getEvaluadorLogueado( uid: string ) {

    return this.http.get(`${ this.url }/evaluadores/${ uid }.json`);

  }
  
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
  }


  getEvaluadores() {
    return this.http.get(`${ this.url }/evaluadores.json`)
    .pipe(
      map( this.crearArregloEval ),
      delay(500)
    );
  }

  public crearArregloEval( evaluadoresObj: object ) {

    const evaluadores: EvaluadorModel[] = [];

    if ( evaluadoresObj === null ) { return []; }

    Object.keys( evaluadoresObj ).forEach( key => {

      const evaluador: EvaluadorModel = evaluadoresObj[ key ];
      evaluador.id = key;


      evaluadores.push( evaluador );
    });


    return evaluadores;

  }


  
  login( usuario: UsuarioModel ) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post( this.loginUser,authData )
    .pipe(
      map( resp => {
        this.guardarToken( resp['idToken'] );
        localStorage.setItem( 'email', resp['email']);
        //localStorage.setItem( 'role', 'evaluador');
        //this.userService.getUser(resp['localId']);

        //console.log( "UID del usuario logueado: "+ resp['localId']);
        //console.log( "Email del usuario logueado: "+ resp['email']);
        /*
        console.log( "UID del usuario logueado: "+ resp['localId']);
        console.log( "Email del usuario logueado: "+ resp['email']);
        */
        return resp;
      })
    );

  }


  /*nuevoUsuario( usuario: UsuarioModel ) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post( this.create, authData)
    .pipe(
      map( resp => {
        console.log( "entro en el mapa ")
        this.guardarToken( resp['idToken'] );
        localStorage.setItem( 'email', resp['email']);
        //localStorage.setItem( 'nombre', resp['nombre']);
        console.log( "UID del usuario logueado: "+ resp['localId']);
        console.log( "Email: "+ resp['email']);
        
        return resp;
      })
    );
  }*/
  
  nuevoUsuario( evaluador: EvaluadorModel ) {
    const authData = {
      ...evaluador,
      returnSecureToken: true
    };
    return this.http.post( this.create, authData)
    .pipe(
      map( resp => {
        //console.log( "entro en el mapa ")
        //this.guardarToken( resp['idToken'] );
        //localStorage.setItem( 'email', resp['email']);
        //localStorage.setItem( 'nombre', resp['nombre']);
        //console.log( "UID del usuario logueado: "+ resp['localId']);
        //console.log( "Email: "+ resp['email']);
        
        return resp;
      })
    );
  }


  nuevoAdmin( evaluador: EvaluadorModel ) {
    const authData = {
      ...evaluador,
      returnSecureToken: true
    };
    return this.http.post( this.create, authData)
    .pipe(
      map( resp => {
        //console.log( "entro en el mapa ")
        //this.guardarToken( resp['idToken'] );
        //localStorage.setItem( 'email', resp['email']);
        //localStorage.setItem( 'nombre', resp['nombre']);
        //console.log( "UID del usuario logueado: "+ resp['localId']);
        //console.log( "Email: "+ resp['email']);
        
        return resp;
      })
    );
  }

  getUsuarios() {
    return this.http.get(this.getUser)
    .pipe(
      map( this.crearArreglo ),
      delay(500)
    );
  }

  public crearArreglo( usuariosObj: object ) {

    //const proyectos: ProyectoModel[] = [];

    if ( usuariosObj === null ) { return []; }

    Object.keys( usuariosObj ).forEach( key => {

      //const proyecto: ProyectoModel = proyectosObj[key];
      //proyecto.id = key;


      //proyectos.push( proyecto );
    });


    //return proyectos;

  }


  crearUser( usuario: UsuarioModel ) {

    return this.http.post(`${ this.url }/usuarios.json`, usuario)
            .pipe(
              map( (resp: any) => {
                //usuario.uid = resp.id;
                //usuario.role = 'evaluador';
                return usuario;
              })
            );

  }





  
  private guardarToken( idToken: string ) {

    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    
    let hoy = new Date();
    //hoy.setSeconds( 3600 );
    //SE CIERRA SESION EN 6 HORAS
    hoy.setSeconds( 21600 );

    localStorage.setItem('expira', hoy.getTime().toString() );


  }

  
  leerToken() {

    if ( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;

  }

  estaAutenticado(): boolean {

    if ( this.userToken.length < 2 ) {
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if ( expiraDate > new Date() ) {
      return true;
    } else {
      return false;
    }


  }
  

  /*
  METODOS ALTERNATIVOS
  */

   	/*fazerLogin(usuario: EvaluadorModel){

	    if (usuario.usuario === 'us' && 
	      usuario.password === '123') {

	      this.usuarioAutenticado = true;

	      this.mostrarMenuEmitter.emit(true);

	      this.router.navigate(['/']);

	    } else {
	      this.usuarioAutenticado = false;

	      this.mostrarMenuEmitter.emit(false);
	    }
  	}*/

  
  
    /*
    getUsuarios() {
      return this.http.get(`${ this.url }/evaluadores.json`)
      .pipe(
        map( this.crearArreglo ),
        delay(500)
      );
   }*/



   /*
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

  }*/

  

  /*
	usuarioEstaAutenticado(){
	  return this.usuarioAutenticado;
	}*/



}
