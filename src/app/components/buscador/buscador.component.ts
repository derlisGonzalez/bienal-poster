import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProyectosService } from '../../services/proyectos.service';


@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styles: [
  ]
})
export class BuscadorComponent implements OnInit {

  proyectos:any[] = []
  termino:string;

  constructor( private activatedRoute:ActivatedRoute,
              private proyectosService: ProyectosService) {

  }

  ngOnInit() {

    this.activatedRoute.params.subscribe( params =>{
      this.termino = params['termino'];
      this.proyectos = this.proyectosService.buscarProyectos( params['termino'] );
      console.log( this.proyectos );
    });

  }

}
