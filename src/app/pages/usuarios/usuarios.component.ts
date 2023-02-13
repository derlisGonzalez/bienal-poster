import { UsuarioModel } from './../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { EvaluadorModel } from '../../models/evaluador.model';
import { EvaluadoresService } from '../../services/evaluadores.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  evaluadores: EvaluadorModel[] = [];
  cargando = false;

  evaluador: EvaluadorModel = new EvaluadorModel();

  constructor( private evaluadoresService: EvaluadoresService ) { }

  ngOnInit()  {

    this.cargando = true;
       this.evaluadoresService.getAdmins()
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
