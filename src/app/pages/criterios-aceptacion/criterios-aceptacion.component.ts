import  Swal  from 'sweetalert2';
import { CriterioAceptacionService } from './../../services/criterio-aceptacion.service';
import { CriterioDeAceptacionModel } from './../../models/criterio-de-aceptacion.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-criterios-aceptacion',
  templateUrl: './criterios-aceptacion.component.html',
  styleUrls: ['./criterios-aceptacion.component.css']
})
export class CriteriosAceptacionComponent implements OnInit {

  criteriosAcep: CriterioDeAceptacionModel[] = [];
  cargando = false;

  constructor( private criteriosAcepService: CriterioAceptacionService ) { }

  ngOnInit() {

    this.cargando = true;
    this.criteriosAcepService.getCriterios()
      .subscribe( resp => {
        console.log(resp);
        this.criteriosAcep = resp;
        this.cargando = false;
      });
  }




    borrarCriterio( criterioAcep: CriterioDeAceptacionModel, i: number ) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ criterioAcep.descripcion }`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {

      if ( resp.value ) {
        this.criteriosAcep.splice(i, 1);
        this.criteriosAcepService.borrarCriterio( criterioAcep.id ).subscribe();
      }

    });

  }

}
