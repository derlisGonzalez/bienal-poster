import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DisertanteModel } from '../models/disertante.model';
import { delay, map } from 'rxjs/operators';
import { CategoriaModel } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class DisertantesService {

  disertante: DisertanteModel;
  categoria: CategoriaModel;

  private url = 'https://angular-bienal-default-rtdb.firebaseio.com';

  constructor( private http: HttpClient ) { }

  

  /*crearDisertante( disertante: {disertante: DisertanteModel, categoria: CategoriaModel} ) {

    return this.http.post(`${ this.url }/disertantes.json`, disertante)
            .pipe(
              map( (resp: any[]) => {
                disertante.disertante;
                disertante.categoria;
                return disertante;
              })
            );

  }*/


  crearDisertante( disertante: DisertanteModel ) {

    return this.http.post(`${ this.url }/disertantes.json`, disertante)
            .pipe(
              map( (resp: any) => {
                disertante.id = resp.name;
                return disertante;
              })
            );

  }


  actualizarDisertante( disertante: DisertanteModel ){

    const disertanteTemp = {
      ...disertante
    };

    delete disertanteTemp.id;

    return this.http.put(`${ this.url }/disertantes/${ disertante.id }.json`, disertanteTemp);
  }


  borrarDisertante( id: string ) {

    return this.http.delete(`${ this.url }/disertantes/${ id }.json`);

  }

  getDisertante( id: string ) {

    return this.http.get(`${ this.url }/disertantes/${ id }.json`);

  }


  getDisertantes() {
    return this.http.get(`${ this.url }/disertantes.json`)
    .pipe(
      map( this.crearArreglo ),
      delay(500)
    );
  }

  private crearArreglo( disertantesObj: object ) {

    const disertantes: DisertanteModel[] = [];

    if ( disertantesObj === null ) { return []; }

    Object.keys( disertantesObj ).forEach( key => {

      const disertante: DisertanteModel = disertantesObj[key];
      disertante.id = key;


      disertantes.push( disertante );
    });


    return disertantes;

  }
}
