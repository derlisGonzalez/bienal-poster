import { Component, OnInit } from '@angular/core';
import { DisertanteModel } from '../../models/disertante.model';
import { DisertantesService } from '../../services/disertantes.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { EvaluadorModel } from 'src/app/models/evaluador.model';

@Component({
  selector: 'app-disertantes',
  templateUrl: './disertantes.component.html',
  styleUrls: ['./disertantes.component.css']
})
export class DisertantesComponent implements OnInit {

  roleUser:string;
  evaluadores: EvaluadorModel[] = [];

  disertantes: DisertanteModel[] = [];
  cargando = false;

  constructor( private disertantesService: DisertantesService,
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
