import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CriterioModel } from '../models/criterio.model';
import { ProyectoModel } from '../models/proyecto.model';
import { DisertanteModel } from '../models/disertante.model';
import { UsuarioModel } from '../models/usuario.model';
import { map, delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  proyecto: ProyectoModel;
  disertante: DisertanteModel;
  criterio: CriterioModel;
  usuario: UsuarioModel;

  private url = 'https://angular-bienal-default-rtdb.firebaseio.com';

  constructor( private http: HttpClient ) {

   }


   crearUsuario( usuario: UsuarioModel ) {

    return this.http.post(`${ this.url }/usuarios.json`, usuario)
            .pipe(
              map( (resp: any) => {
                usuario.uid = resp.name;
                return usuario;
              })
            );

  }


  actualizarUsuario( usuario: UsuarioModel ){

    const usuarioTemp = {
      ...usuario
    };

    delete usuarioTemp.uid;

    return this.http.put(`${ this.url }/usuarios/${ usuario.uid }.json`, usuarioTemp);
  }


  /*realizarVotacion( proyecto: ProyectoModel ){

    const proyectoTemp = {
      ...proyecto
    };

    delete proyectoTemp.id;

    return this.http.put(`${ this.url }/proyectos/${ proyecto.id }.json`, proyectoTemp);
  }*/


  borrarUsuario( uid: string ) {

    return this.http.delete(`${ this.url }/usuarios/${ uid }.json`);

  }

  getUsuario( uid: string ) {

    return this.http.get(`${ this.url }/usuarios/${ uid }.json`);

  }


  obtenerMedicoPorId( id: string ) {

    //const url = `${ base_url }/medicos/${ id }`;
    //return this.http.get( url, this.headers )
            //  .pipe(
            //    map( (resp: {ok: boolean, medico: Medico }) => resp.medico )
             // );
  }


  //posible error
  getProyectoIdx( idx: string ) {

    return this.proyecto[idx];

  }


  getUsuarios() {
    return this.http.get(`${ this.url }/usuarios.json`)
    .pipe(
      map( this.crearArreglo ),
      delay(500)
    );
  }

  public crearArreglo( usuariosObj: object ) {

    const usuarios: UsuarioModel[] = [];

    if ( usuariosObj === null ) { return []; }

    Object.keys( usuariosObj ).forEach( key => {

      const usuario: UsuarioModel = usuariosObj[key];
      usuario.uid = key;


      usuarios.push( usuario );
    });


    return usuarios;

  }
}
