import { Component, OnInit } from '@angular/core';
import { ProyectoModel } from '../../models/proyecto.model';
import { ProyectosService } from '../../services/proyectos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.css']
})
export class CalificacionesComponent implements OnInit {

  proyectos: ProyectoModel[] = [];
  cargando = false;

  constructor( private proyectosService: ProyectosService,
               private router:Router ) { }

  ngOnInit()  {

    this.cargando = true;
    this.proyectosService.getProyectos()
      .subscribe( resp => {
        console.log(resp);
        this.proyectos = resp;
        this.cargando = false;
      });
  }


  borrarProyecto( proyecto: ProyectoModel, i: number ) {

    /*Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ carrera.descripcion }`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {*/

      //if ( resp.value ) {
        this.proyectos.splice(i, 1);
        this.proyectosService.borrarProyecto( proyecto.id ).subscribe();
      //}

    //});

  }


  calificarProyecto(idx:number){
    console.log(idx);
    this.router.navigate( ['/calificacion',idx] );

  }

}
