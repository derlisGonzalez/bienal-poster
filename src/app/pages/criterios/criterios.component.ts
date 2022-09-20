import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CriterioModel } from '../../models/criterio.model';
import { CriteriosService } from '../../services/criterios.service';

@Component({
  selector: 'app-criterios',
  templateUrl: './criterios.component.html',
  styleUrls: ['./criterios.component.css']
})
export class CriteriosComponent implements OnInit {

  criterios: CriterioModel[] = [];
  cargando = false;

  constructor( private criteriosService: CriteriosService ) { }

  ngOnInit()  {

    this.cargando = true;
    this.criteriosService.getCriterios()
      .subscribe( resp => {
        console.log(resp);
        this.criterios = resp;
        this.cargando = false;
      });
  }

  borrarCriterio( criterio: CriterioModel, i: number ) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ criterio.descripcion }`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {

      if ( resp.value ) {
        this.criterios.splice(i, 1);
        this.criteriosService.borrarCriterio( criterio.id ).subscribe();
      }

    });

  }

}
