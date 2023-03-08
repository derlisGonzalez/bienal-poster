import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EvaluadorModel } from '../models/evaluador.model';
import { map, delay } from 'rxjs/operators';
import { CarreraModel } from '../models/carrera.model';

@Injectable({
  providedIn: 'root'
})
export class EvaluadoresService {

  carrera: CarreraModel;

  private url = 'https://angular-bienal-default-rtdb.firebaseio.com';

  constructor( private http: HttpClient ) { }

  crearEvaluador( evaluador: EvaluadorModel ) {

    return this.http.post(`${ this.url }/evaluadores.json`, evaluador)
            .pipe(
              map( (resp: any) => {
                evaluador.id = resp.name;
                return evaluador;
              })
            );

  }


  actualizarEvaluador( evaluador: EvaluadorModel ){

    const evaluadorTemp = {
      ...evaluador
    };

    delete evaluadorTemp.id;

    return this.http.put(`${ this.url }/evaluadores/${ evaluador.id }.json`, evaluadorTemp);
  }


  borrarEvaluador( id: string ) {

    return this.http.delete(`${ this.url }/evaluadores/${ id }.json`);

  }

  getEvaluador( id: string ) {

    return this.http.get(`${ this.url }/evaluadores/${ id }.json`);

  }


  getEvaluadores() {
    return this.http.get(`${ this.url }/evaluadores.json`)
    .pipe(
      map( this.crearArreglo ),
      delay(500)
    );
  }


    getAdmins() {
    return this.http.get(`${ this.url }/evaluadores.json`)
    .pipe(
      map( this.crearArregloAdmin ),
      delay(500)
    );
  }


  //CODIGO DE EJEMPLO
  /*
  saveUserBucketListInDb(bucketListItems: Array<object> ) {

    this.angularFireDb.object('/bucketList/' + uid).set({
      bucketListItems
    });
  }*/

  private crearArregloAdmin( evaluadoresObj: object ) {

    const evaluadores: EvaluadorModel[] = [];

    if ( evaluadoresObj === null ) { return []; }

    Object.keys( evaluadoresObj ).forEach( key => {

      const evaluador: EvaluadorModel = evaluadoresObj[key];
      evaluador.id = key;

      //if (evaluador.rol === "administrador") {
        evaluadores.push( evaluador );
      //}
      
    });


    return evaluadores;

  }



    private crearArreglo( evaluadoresObj: object ) {

    const evaluadores: EvaluadorModel[] = [];

    if ( evaluadoresObj === null ) { return []; }

    Object.keys( evaluadoresObj ).forEach( key => {

      const evaluador: EvaluadorModel = evaluadoresObj[key];
      evaluador.id = key;


      //if (evaluador.rol === "evaluador") {
        evaluadores.push( evaluador );
      //}

      
      
    });


    return evaluadores;

  }

}
