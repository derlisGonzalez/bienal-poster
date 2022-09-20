import { Injectable } from '@angular/core';
import { CriterioModel } from '../models/criterio.model';
import { map, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CriteriosService {

  private url = 'https://angular-bienal-default-rtdb.firebaseio.com';

  constructor( private http: HttpClient ) { }



  crearCriterio( criterio: CriterioModel ) {

    return this.http.post(`${ this.url }/criterios.json`, criterio)
            .pipe(
              map( (resp: any) => {
                criterio.id = resp.name;
                return criterio;
              })
            );

  }


  actualizarCriterio( criterio: CriterioModel ){

    const criterioTemp = {
      ...criterio
    };

    delete criterioTemp.id;

    return this.http.put(`${ this.url }/criterios/${ criterio.id }.json`, criterioTemp);
  }

  borrarCriterio( id: string ) {

    return this.http.delete(`${ this.url }/criterios/${ id }.json`);

  }

  getCriterio( id: string ) {

    return this.http.get(`${ this.url }/criterios/${ id }.json`);

  }


  getCriterios() {
    return this.http.get(`${ this.url }/criterios.json`)
    .pipe(
      map( this.crearArreglo ),
      delay(500)
    );
  }


  private crearArreglo( criteriosObj: CriterioModel ) {

    const criterios: CriterioModel[] = [];

    if ( criteriosObj === null ) { return []; }

    Object.keys( criteriosObj ).forEach( key => {

      const criterio: CriterioModel = criteriosObj[key];
      criterio.id = key;


      criterios.push( criterio );
    });


    return criterios;

  }
}
