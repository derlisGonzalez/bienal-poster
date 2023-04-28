import { Component, OnInit } from '@angular/core';
import { CarrerasService } from '../../services/carreras.service';
import { CarreraModel } from '../../models/carrera.model';
import Swal from 'sweetalert2';
import { EvaluadorModel } from 'src/app/models/evaluador.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css']
})
export class CarrerasComponent implements OnInit {

  roleUser:string;
  evaluadores: EvaluadorModel[] = [];

  carreras: CarreraModel[] = [];
  cargando = false;

  constructor( private carrerasService: CarrerasService,
                private auth: AuthService) { 

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
    this.carrerasService.getCarreras()
      .subscribe( resp => {
        console.log(resp);
        this.carreras = resp;
        this.cargando = false;
      });
  }


  borrarCarrera( carrera: CarreraModel, i: number ) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ carrera.descripcion }`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {

      if ( resp.value ) {
        this.carreras.splice(i, 1);
        this.carrerasService.borrarCarrera( carrera.id ).subscribe();
      }

    });

  }

}
