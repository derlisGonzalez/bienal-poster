import { Component, OnInit } from '@angular/core';
import { CategoriaModel } from '../../models/categoria.model';
import { CategoriasService } from '../../services/categorias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  categorias: CategoriaModel[] = [];
  cargando = false;

  constructor( private categoriasService: CategoriasService ) { }

  ngOnInit()  {

    this.cargando = true;
    this.categoriasService.getCategorias()
      .subscribe( resp => {
        console.log(resp);
        this.categorias = resp;
        this.cargando = false;
      });
  }


  borrarCategoria( categoria: CategoriaModel, i: number ) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ categoria.descripcion }`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {

      if ( resp.value ) {
        this.categorias.splice(i, 1);
        this.categoriasService.borrarCategoria( categoria.id ).subscribe();
      }

    });

  }

}
