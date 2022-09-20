import { Component, OnInit } from '@angular/core';
import { ProyectoModel } from '../../models/proyecto.model';
import { ProyectosService } from '../../services/proyectos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  proyectos: ProyectoModel[] = [];
  cargando = false;

  constructor( private proyectosService: ProyectosService ) { }

  ngOnInit()  {

    this.cargando = true;
    this.proyectosService.getProyectos()
      .subscribe( resp => {
        console.log(resp);
        this.proyectos = resp;
        this.cargando = false;
      });
  }


  aleatorio = Math.random();

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

}
