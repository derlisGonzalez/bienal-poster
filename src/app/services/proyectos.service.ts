import { Injectable } from '@angular/core';
import { ProyectoModel } from '../models/proyecto.model';
import { DisertanteModel } from '../models/disertante.model';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';
import { CriterioModel } from '../models/criterio.model';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  
  proyecto: ProyectoModel;
  disertante: DisertanteModel;
  criterio: CriterioModel;

  proyectos: ProyectoModel[] = [];

  private url = 'https://angular-bienal-default-rtdb.firebaseio.com';

  constructor( private http: HttpClient ) { 

    //this.getProyectos();
  }

  
  

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


  crearProyecto( proyecto: ProyectoModel ) {
    return this.http.post(`${ this.url }/proyectos.json`, proyecto)
      .pipe(
        map( (resp: any) => {
          proyecto.id = resp.name;
          return proyecto;
        })
      );

  }


  actualizarProyecto( proyecto: ProyectoModel ){
    const proyectoTemp = {
      ...proyecto
    };
    delete proyectoTemp.id;
    return this.http.put(`${ this.url }/proyectos/${ proyecto.id }.json`, proyectoTemp);
  }

  actualizarSubTotal( subtotal: number ) {
    const subTemp = {
      subtotal
    };
    return this.http.put(`${ this.url }/proyectos/evaluador1/${ subtotal }.json`, subTemp);
  }

  actualizarEvaluador1( subtotal: number ) {

    const proyectoTemp = {
      subtotal
    };

    delete proyectoTemp.subtotal;

    return this.http.put(`${ this.url }/proyectos.evaluador1.subtotal/${ subtotal }.json`, proyectoTemp);
  }


  realizarVotacion( proyecto: ProyectoModel ){

    const proyectoTemp = {
      ...proyecto
    };

    delete proyectoTemp.id;

    return this.http.put(`${ this.url }/proyectos/${ proyecto.id }.json`, proyectoTemp);
  }


  borrarProyecto( id: string ) {

    return this.http.delete(`${ this.url }/proyectos/${ id }.json`);

  }



  getProyecto( id: string ) {

    return this.http.get(`${ this.url }/proyectos/${ id }.json`);

  }


  //posible error
  getProyectoIdx( idx: string ) {

    return this.proyecto[idx];

  }


  getProyectos() {
    return this.http.get(`${ this.url }/proyectos.json`)
    .pipe(
      map( this.crearArreglo ),
      delay(500)
    );
  }

  public crearArreglo( proyectosObj: object ) {

    const proyectos: ProyectoModel[] = [];

    if ( proyectosObj === null ) { return []; }

    Object.keys( proyectosObj ).forEach( key => {

      const proyecto: ProyectoModel = proyectosObj[key];
      proyecto.id = key;


      proyectos.push( proyecto );
    });


    return proyectos;

  }


  /*
    buscarHeroes( termino:string ):Heroe[]{

    let heroesArr:Heroe[] = [];
    termino = termino.toLowerCase();

    for( let i = 0; i < this.heroes.length; i ++ ){

      let heroe = this.heroes[i];

      let nombre = heroe.nombre.toLowerCase();

      if( nombre.indexOf( termino ) >= 0  ){
        heroe.idx = i;
        heroesArr.push( heroe )
      }

    }

    return heroesArr;

  }
  */


/*

  buscarProyectos( termino:string ):ProyectoModel[]{

    let proyectosArr: ProyectoModel[] = [];
    //let proyectosArr:ProyectoModel[] = [];
    termino = termino.toLowerCase();

    for( let proyecto of this.proyectos ){

      //let proyecto = proyectos[i];

      let titulo = proyecto.titulo.toLowerCase();

      if( titulo.indexOf( termino ) >= 0  ){
        //this.proyecto.id = i;
        proyectosArr.push( proyecto )
      }

    }

    return proyectosArr;

  }
*/



  buscarProyectos( termino:string ):ProyectoModel[]{

    let proyectosArr: ProyectoModel[] = [];
    //let proyectosArr:ProyectoModel[] = [];
    termino = termino.toLowerCase();

    for( let i = 0; i < this.proyectos.length; i ++ ){

      let proyecto = this.proyectos[i];

      let titulo = this.proyecto.titulo.toLowerCase();

      if( titulo.indexOf( termino ) >= 0  ){
        //this.proyecto.id = i;
        proyectosArr.push( proyecto )
      }

    }

    return proyectosArr;

  }

  
}
