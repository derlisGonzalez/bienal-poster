import { Component, OnInit } from '@angular/core';
import { CategoriaModel } from '../../models/categoria.model';
import { CategoriasService } from '../../services/categorias.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { EvaluadorModel } from 'src/app/models/evaluador.model';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  roleUser:string;
  evaluadores: EvaluadorModel[] = [];

  categorias: CategoriaModel[] = [];
  cargando = false;

  constructor( private categoriasService: CategoriasService,
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
    this.categoriasService.getCategorias()
      .subscribe( resp => {
        console.log(resp);
        this.categorias = resp;
        this.cargando = false;
      });
  }


  borrarCategoria( categoria: CategoriaModel, i: number ) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ categoria.descripcion }`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {

      if ( resp.value ) {
        this.categorias.splice(i, 1);
        this.categoriasService.borrarCategoria( categoria.id ).subscribe();
      }

    });

  }

}
