import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CriteriosService } from '../../services/criterios.service';

import Swal from 'sweetalert2';
import { CriterioModel } from '../../models/criterio.model';

@Component({
  selector: 'app-criterio',
  templateUrl: './criterio.component.html',
  styleUrls: ['./criterio.component.css']
})
export class CriterioComponent implements OnInit {

  criterio: CriterioModel = new CriterioModel();

  constructor( private criteriosService: CriteriosService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ) {

      this.criteriosService.getCriterio( id )
        .subscribe( (resp: CriterioModel) => {
          this.criterio = resp;
          this.criterio.id = id;
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

    if ( this.criterio.id ) {
      peticion = this.criteriosService.actualizarCriterio( this.criterio );
    } else {
      peticion = this.criteriosService.crearCriterio( this.criterio );
    }


    peticion.subscribe( resp => {

    Swal.fire({
      title: this.criterio.descripcion,
      text: 'Se actualizó correctamente',
      icon: 'success'
    });

    });

    console.log(form);
    console.log(this.criterio);

    //location.reload();

  }

}
