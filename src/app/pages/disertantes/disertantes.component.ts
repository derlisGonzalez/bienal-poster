import { Component, OnInit } from '@angular/core';
import { DisertanteModel } from '../../models/disertante.model';
import { DisertantesService } from '../../services/disertantes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-disertantes',
  templateUrl: './disertantes.component.html',
  styleUrls: ['./disertantes.component.css']
})
export class DisertantesComponent implements OnInit {

  disertantes: DisertanteModel[] = [];
  cargando = false;

  constructor( private disertantesService: DisertantesService ) { }

  ngOnInit()  {

    this.cargando = true;
    this.disertantesService.getDisertantes()
      .subscribe( resp => {
        console.log(resp);
        this.disertantes = resp;
        this.cargando = false;
      });
  }


  borrarDisertante( disertante: DisertanteModel, i: number ) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ disertante.nombre }`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {

      if ( resp.value ) {
        this.disertantes.splice(i, 1);
        this.disertantesService.borrarDisertante( disertante.id ).subscribe();
      }

    });

  }
}
