import { Component, OnInit } from '@angular/core';
import { EvaluadorModel } from '../../models/evaluador.model';
import { EvaluadoresService } from '../../services/evaluadores.service';

import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-evaluadores',
  templateUrl: './evaluadores.component.html',
  styleUrls: ['./evaluadores.component.css']
})
export class EvaluadoresComponent implements OnInit {

  roleUser:string;
  //evaluadores: EvaluadorModel[] = [];

  evaluadores: EvaluadorModel[] = [];
  cargando = false;

  evaluador: EvaluadorModel = new EvaluadorModel();

  constructor( private evaluadoresService: EvaluadoresService,
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
    this.evaluadoresService.getEvaluadores()
      .subscribe( resp => {
        // resp.forEach( function(punto){
        //   suma    += Number(punto.puntajeAsignado);
        // })
        console.log(resp.forEach);

        this.evaluadores = resp;
        this.cargando = false;
      });
  }


  borrarEvaluador( evaluador: EvaluadorModel, i: number ) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ evaluador.nombre }`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {

      if ( resp.value ) {
        this.evaluadores.splice(i, 1);
        this.evaluadoresService.borrarEvaluador( evaluador.id ).subscribe();
      }

    });

  }
}
