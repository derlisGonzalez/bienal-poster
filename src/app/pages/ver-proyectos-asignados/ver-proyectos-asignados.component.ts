import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EvaluadorModel } from 'src/app/models/evaluador.model';
import { ProyectoModel } from 'src/app/models/proyecto.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-ver-proyectos-asignados',
  templateUrl: './ver-proyectos-asignados.component.html',
  styleUrls: ['./ver-proyectos-asignados.component.css']
})
export class VerProyectosAsignadosComponent implements OnInit {


  roleUser:string;
  evaluadores: EvaluadorModel[] = [];

  proyectos: ProyectoModel[] = [];
  cargando = false;

  userActivo = localStorage.getItem('email');

  constructor( private proyectosService: ProyectosService,
               private router:Router,
               private auth: AuthService ) {

                this.auth.getEvaluadores()
                .subscribe( respEval => {
                  // resp.forEach( function(punto){
                  //   suma    += Number(punto.puntajeAsignado);
                  // })
                  //console.log(respEval);
            
                  this.evaluadores = respEval;
                  //console.log(this.evaluadores[45].filter(correo));
            
                  const indice = this.evaluadores.findIndex((elemento, indice) => {
                  if (elemento.email === localStorage.getItem('email')) {
                    //console.log(indice);
                    //console.log(this.evaluadores[indice]);
                    const data = this.evaluadores[indice];
            
                    console.log(data.role);
            
                    localStorage.setItem('role', data.role);
            
                    this.roleUser = data.role;
            
                  }
            
                });
                  //console.log(JSON.stringify({ respEval }));
                  //let data = JSON.stringify({ respEval });
                  //console.log(data);
                 
                });


                }

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