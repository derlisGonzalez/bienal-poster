import { Injectable } from '@angular/core';
import { CarreraModel } from '../models/carrera.model';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {

  private url = 'https://angular-bienal-default-rtdb.firebaseio.com';

  constructor( private http: HttpClient ) { }


  crearCarrera( carrera: CarreraModel ) {

    return this.http.post(`${ this.url }/carreras.json`, carrera)
            .pipe(
              map( (resp: any) => {
                carrera.id = resp.name;
                return carrera;
              })
            );

  }


  actualizarCarera( carrera: CarreraModel ){

    const carreraTemp = {
      ...carrera
    };

    delete carreraTemp.id;

    return this.http.put(`${ this.url }/carreras/${ carrera.id }.json`, carreraTemp);
  }

  borrarCarrera( id: string ) {

    return this.http.delete(`${ this.url }/carreras/${ id }.json`);

  }

  getCarrera( id: string ) {

    return this.http.get(`${ this.url }/carreras/${ id }.json`);

  }


  getCarreras() {
    return this.http.get(`${ this.url }/carreras.json`)
    .pipe(
      map( this.crearArreglo ),
      delay(500)
    );
  }


  private crearArreglo( carrerasObj: object ) {

    const carreras: CarreraModel[] = [];

    if ( carrerasObj === null ) { return []; }

    Object.keys( carrerasObj ).forEach( key => {

      const carrera: CarreraModel = carrerasObj[key];
      carrera.id = key;


      carreras.push( carrera );
    });


    return carreras;

  }

}
