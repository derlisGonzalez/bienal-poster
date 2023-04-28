import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CriterioModel } from '../../models/criterio.model';
import { CriteriosService } from '../../services/criterios.service';
import { EvaluadorModel } from 'src/app/models/evaluador.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-criterios',
  templateUrl: './criterios.component.html',
  styleUrls: ['./criterios.component.css']
})
export class CriteriosComponent implements OnInit {

  roleUser:string;
  evaluadores: EvaluadorModel[] = [];

  criterios: CriterioModel[] = [];
  cargando = false;

  constructor( private criteriosService: CriteriosService,
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
    this.criteriosService.getCriterios()
      .subscribe( resp => {
        console.log(resp);
        this.criterios = resp;
        this.cargando = false;
        //console.log(this.criterios.length);
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
