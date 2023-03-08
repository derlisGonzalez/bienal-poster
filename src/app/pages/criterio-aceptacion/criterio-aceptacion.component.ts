import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CriterioAceptacionService } from './../../services/criterio-aceptacion.service';
import { CriterioDeAceptacionModel } from './../../models/criterio-de-aceptacion.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-criterio-aceptacion',
  templateUrl: './criterio-aceptacion.component.html',
  styleUrls: ['./criterio-aceptacion.component.css']
})
export class CriterioAceptacionComponent implements OnInit {

  criterioAcept: CriterioDeAceptacionModel = new CriterioDeAceptacionModel();

  constructor( private criteriosAcepService: CriterioAceptacionService, private route: ActivatedRoute ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ) {

      this.criteriosAcepService.getCriterio( id )
        .subscribe( (resp: CriterioDeAceptacionModel) => {
          this.criterioAcept = resp;
          this.criterioAcept.id = id;
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

    if ( this.criterioAcept.id ) {
      peticion = this.criteriosAcepService.actualizarCriterio( this.criterioAcept );
    } else {
      peticion = this.criteriosAcepService.crearCriterio( this.criterioAcept );
    }


    peticion.subscribe( resp => {

    Swal.fire({
      title: this.criterioAcept.descripcion,
      text: 'Se actualizó correctamente',
      icon: 'success'
    });

    });

    console.log(form);
    console.log(this.criterioAcept);

    //location.reload();

  }


}
