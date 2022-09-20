import { Component, OnInit } from '@angular/core';
import { DisertanteModel } from '../../models/disertante.model';
import { DisertantesService } from '../../services/disertantes.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { CategoriaModel } from '../../models/categoria.model';
import { CategoriasService } from '../../services/categorias.service';
import { CarrerasService } from '../../services/carreras.service';
import { CarreraModel } from '../../models/carrera.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-disertante',
  templateUrl: './disertante.component.html',
  styleUrls: ['./disertante.component.css']
})
export class DisertanteComponent implements OnInit {

  public categorias: CategoriaModel[] = [];
  public carreras: CarreraModel[] = [];

  public categoriaSeleccionada: CategoriaModel;
  public carreraSeleccionada: CarreraModel
  ;
  disertante: DisertanteModel = new DisertanteModel();

  constructor( private disertantesService: DisertantesService,
               private categoriasService: CategoriasService,
               private carrerasService: CarrerasService,
               private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ) {

      this.disertantesService.getDisertante( id )
        .subscribe( (resp: DisertanteModel) => {
          this.disertante = resp;
          this.disertante.id = id;
        });

    }

    //this.cargarCategorias();

   
   
    this.categoriasService.getCategorias()
    .subscribe( categorias => {
      this.categorias = categorias;

      this.categorias.unshift({
        descripcion: '[ Seleccione Categoria]',
        id: ''
      })

      // console.log( this.paises );
    });


    this.carrerasService.getCarreras()
    .subscribe( carreras => {
      this.carreras = carreras;

      this.carreras.unshift({
        descripcion: '[ Seleccione Carrera]',
        id: ''
      })

      // console.log( this.paises );
    });
    /*this.disertantesService.get('hospital').valueChanges
        .subscribe( categoriaId => {
          this.categoriaSeleccionadah = this.categorias.find( h => h.id === categoriaId );
        })*/
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

    if ( this.disertante.id ) {
      peticion = this.disertantesService.actualizarDisertante( this.disertante );
    } else {
      peticion = this.disertantesService.crearDisertante(this.disertante );
    }


    peticion.subscribe( resp => {

    Swal.fire({
      title: this.disertante.nombre,
      text: 'Se actualizó correctamente',
      icon: 'success'
    });

    });

    console.log(form);
    console.log(this.disertante);

  }


  cargarCategorias() {

    this.categoriasService.getCategorias()
      .subscribe( (categorias: CategoriaModel[]) => {
        this.categorias = categorias;
      })

  }

}
