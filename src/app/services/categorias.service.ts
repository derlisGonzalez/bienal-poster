import { Injectable } from '@angular/core';
import { CategoriaModel } from '../models/categoria.model';
import { map, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private url = 'https://angular-bienal-default-rtdb.firebaseio.com';

  constructor( private http: HttpClient ) { }


  crearCategoria( categoria: CategoriaModel ) {

    return this.http.post(`${ this.url }/categorias.json`, categoria)
            .pipe(
              map( (resp: any) => {
                categoria.id = resp.name;
                return categoria;
              })
            );

  }


  actualizarCategoria( categoria: CategoriaModel ){

    const categoriaTemp = {
      ...categoria
    };

    delete categoriaTemp.id;

    return this.http.put(`${ this.url }/categorias/${ categoria.id }.json`, categoriaTemp);
  }

  borrarCategoria( id: string ) {

    return this.http.delete(`${ this.url }/categorias/${ id }.json`);

  }

  getCategoria( id: string ) {

    return this.http.get(`${ this.url }/categorias/${ id }.json`);

  }


  getCategorias() {
    return this.http.get(`${ this.url }/categorias.json`)
    .pipe(
      map( this.crearArreglo ),
      delay(500)
    );
  }


  private crearArreglo( categoriasObj: object ) {

    const categorias: CategoriaModel[] = [];

    if ( categoriasObj === null ) { return []; }

    Object.keys( categoriasObj ).forEach( key => {

      const categoria: CategoriaModel = categoriasObj[key];
      categoria.id = key;


      categorias.push( categoria );
    });


    return categorias;

  }
}
