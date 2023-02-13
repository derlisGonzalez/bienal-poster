import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CategoriasService } from '../../services/categorias.service';

import Swal from 'sweetalert2';
import { CategoriaModel } from '../../models/categoria.model';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categoria: CategoriaModel = new CategoriaModel();

  constructor( private categoriasService: CategoriasService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ) {

      this.categoriasService.getCategoria( id )
        .subscribe( (resp: CategoriaModel) => {
          this.categoria = resp;
          this.categoria.id = id;
        });

    }
  }




  guardar( form: NgForm ) {

    if ( form.invalid ) {
       
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Formulario no valido!'
        //footer: '<a href="">Why do I have this issue?</a>'
      })
      console.log('Formulario no válido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();

    let peticion: Observable<any>;

    if ( this.categoria.id ) {
      peticion = this.categoriasService.actualizarCategoria( this.categoria );
    } else {
      peticion = this.categoriasService.crearCategoria( this.categoria );
    }


    peticion.subscribe( resp => {

      Swal.fire({
        title: this.categoria.descripcion,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });

    });

    console.log(form);
    console.log(this.categoria);

    //location.reload();


  }

}
