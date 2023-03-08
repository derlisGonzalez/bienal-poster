import { map, delay } from 'rxjs/operators';
import { CriterioDeAceptacionModel } from './../models/criterio-de-aceptacion.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CriterioAceptacionService {

  private url = 'https://angular-bienal-default-rtdb.firebaseio.com';


  constructor( private http: HttpClient ) { }



  crearCriterio( criterioAcep: CriterioDeAceptacionModel ) {

    return this.http.post(`${ this.url }/criterios-aceptacion.json`, criterioAcep)
            .pipe(
              map( (resp: any) => {
                criterioAcep.id = resp.name;
                return criterioAcep;
              })
            );

  }


  actualizarCriterio( criterioAcep: CriterioDeAceptacionModel ){

    const criterioTemp = {
      ...criterioAcep
    };

    delete criterioTemp.id;

    return this.http.put(`${ this.url }/criterios-aceptacion/${ criterioAcep.id }.json`, criterioTemp);
  }

  borrarCriterio( id: string ) {

    return this.http.delete(`${ this.url }/criterios-aceptacion/${ id }.json`);

  }

  getCriterio( id: string ) {

    return this.http.get(`${ this.url }/criterios-aceptacion/${ id }.json`);

  }


  getCriterios() {
    return this.http.get(`${ this.url }/criterios-aceptacion.json`)
    .pipe(
      map( this.crearArreglo ),
      delay(500)
    );
  }


  private crearArreglo( criteriosObj: CriterioDeAceptacionModel ) {

    const criteriosAcep: CriterioDeAceptacionModel[] = [];

    if ( criteriosObj === null ) { return []; }

    Object.keys( criteriosObj ).forEach( key => {

      const criterioAcept: CriterioDeAceptacionModel = criteriosObj[key];
      criterioAcept.id = key;


      criteriosAcep.push( criterioAcept );
    });


    return criteriosAcep;

  }


}
