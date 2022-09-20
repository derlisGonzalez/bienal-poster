import { UsuarioModel } from './../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: UsuarioModel[] = [];
  cargando = false;

  constructor( private usuariosService: UserService ) { }

  ngOnInit()  {

    this.cargando = true;
    this.usuariosService.getUsuarios()
      .subscribe( resp => {
        console.log(resp);
        this.usuarios = resp;
        this.cargando = false;
      });
  }


  borrarUsuario( usuario: UsuarioModel, i: number ) {

    /*Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ carrera.descripcion }`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {*/

      //if ( resp.value ) {
        this.usuarios.splice(i, 1);
        this.usuariosService.borrarUsuario( usuario.uid ).subscribe();
      //}

    //});

  }

}
