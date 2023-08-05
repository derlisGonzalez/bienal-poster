import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CategoriasService } from '../../services/categorias.service';

import Swal from 'sweetalert2';
import { CategoriaModel } from '../../models/categoria.model';
import { EvaluadorModel } from 'src/app/models/evaluador.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  roleUser:string;
  evaluadores: EvaluadorModel[] = [];

  forma: FormGroup;

  categoria: CategoriaModel = new CategoriaModel();

  constructor( private fb: FormBuilder,
    private categoriasService: CategoriasService,
    private route: ActivatedRoute,
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
      this.crearFormulario();
     
    }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ) {

      this.categoriasService.getCategoria( id )
        .subscribe( (resp: CategoriaModel) => {
          this.categoria = resp;
          this.categoria.id = id;
        });

    }

   
  }


  crearFormulario() {
    this.forma = this.fb.group({
      id: [''],
      descripcion: ['', Validators.required,]
    });

  }



  guardar( ) {

    if ( this.forma.invalid ) {
       
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Formulario no valido!'
        //footer: '<a href="">Why do I have this issue?</a>'
      })
      console.log('Formulario no válido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();

    let peticion: Observable<any>;

    if ( this.categoria.id ) {
      peticion = this.categoriasService.actualizarCategoria( this.categoria );
    } else {
      peticion = this.categoriasService.crearCategoria( this.categoria );
    }


    peticion.subscribe( resp => {
      Swal.fire({
        title: this.categoria.descripcion,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });

    this.forma.reset({ });

    });

    console.log(this.forma);
    console.log(this.categoria);


    //this.forma.reset({ });
  
    //this.vaciarCampo();
    
    //location.reload();

    //this.forma.reset();

  }


  /*vaciarCampo() {
    this.forma = this.fb.group({
      id: [''],
      descripcion: ['']
    });

  }*/

}
