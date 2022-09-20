import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-modal-calificar',
  templateUrl: './modal-calificar.component.html',
  styleUrls: ['./modal-calificar.component.css']
})
export class ModalCalificarComponent implements OnInit {

  proyecto:any = {};

  constructor( private proyectosService: ProyectosService,
               private activatedRoute: ActivatedRoute) {

      this.activatedRoute.params.subscribe( params =>{
        this.proyecto = this.proyectosService.getProyectoIdx( params['idx'] );
        console.log(this.proyecto);
    });
     }

  ngOnInit(): void {
  }

}
