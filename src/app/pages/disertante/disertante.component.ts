import { Component, OnInit } from '@angular/core';
import { DisertanteModel } from '../../models/disertante.model';
import { DisertantesService } from '../../services/disertantes.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CategoriaModel } from '../../models/categoria.model';
import { CategoriasService } from '../../services/categorias.service';
import { CarrerasService } from '../../services/carreras.service';
import { CarreraModel } from '../../models/carrera.model';

import Swal from 'sweetalert2';
import { EvaluadorModel } from 'src/app/models/evaluador.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-disertante',
  templateUrl: './disertante.component.html',
  styleUrls: ['./disertante.component.css']
})
export class DisertanteComponent implements OnInit {

  roleUser:string;
  evaluadores: EvaluadorModel[] = [];

  forma: FormGroup;

  public categorias: CategoriaModel[] = [];
  public carreras: CarreraModel[] = [];

  public categoriaSeleccionada: CategoriaModel;
  public carreraSeleccionada: CarreraModel;
  disertante: DisertanteModel = new DisertanteModel();

  constructor( private fb: FormBuilder,
               private disertantesService: DisertantesService,
               private categoriasService: CategoriasService,
               private carrerasService: CarrerasService,
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
            
                    //console.log(data.role);
            
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

      this.disertantesService.getDisertante( id )
        .subscribe( (resp: DisertanteModel) => {
          this.disertante = resp;
          this.disertante.id = id;
        });

    }

    //this.cargarCategorias();

   
   
    this.categoriasService.getCategorias()
    .subscribe( categorias => {
      this.categorias = categorias;

      /*this.categorias.unshift({
        descripcion: '[ Seleccione Categoria]',
        id: ''
      })*/

      // console.log( this.paises );
    });


    this.carrerasService.getCarreras()
    .subscribe( carreras => {
      this.carreras = carreras;

      /*this.carreras.unshift({
        descripcion: '[ Seleccione Carrera]',
        id: ''
      })*/

      // console.log( this.paises );
    });
    /*this.disertantesService.get('hospital').valueChanges
        .subscribe( categoriaId => {
          this.categoriaSeleccionadah = this.categorias.find( h => h.id === categoriaId );
        })*/
  }

  crearFormulario() {
    this.forma = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      institucion: ['', Validators.required],
      area: ['', [Validators.required]],
      categoria: ['', [Validators.required]],

    });

  }




  guardar(  ) {

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

    if ( this.disertante.id ) {
      peticion = this.disertantesService.actualizarDisertante( this.disertante );
    } else {
      peticion = this.disertantesService.crearDisertante(this.disertante );
    }


    peticion.subscribe( resp => {

    Swal.fire({
      title: this.disertante.nombre,
      text: 'Se actualizó correctamente',
      icon: 'success'
    });

    this.forma.reset();

    });

    //(this.forma);
    //console.log(this.disertante);

  }


  cargarCategorias() {

    this.categoriasService.getCategorias()
      .subscribe( (categorias: CategoriaModel[]) => {
        this.categorias = categorias;
      })

  }

}
