import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriaModel } from 'src/app/models/categoria.model';
import { CriterioModel } from 'src/app/models/criterio.model';
import { DisertanteModel } from 'src/app/models/disertante.model';
import { EvaluadorModel } from 'src/app/models/evaluador.model';
import { ProyectoModel } from 'src/app/models/proyecto.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { CategoriasService } from 'src/app/services/categorias.service';
import { CriteriosService } from 'src/app/services/criterios.service';
import { DisertantesService } from 'src/app/services/disertantes.service';
import { EvaluadoresService } from 'src/app/services/evaluadores.service';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { CarrerasService } from 'src/app/services/carreras.service';
import { CarreraModel } from 'src/app/models/carrera.model';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  forma: FormGroup;
  public criterios: CriterioModel[] = [];
  public evaluadores: EvaluadorModel[] = [];
  public disertantes: DisertanteModel[] = [];
  public categorias: CategoriaModel[] = [];
  public carreras: CarreraModel[] = [];
  public disertanteSeleccionado: DisertanteModel;
  //public carreraSeleccionada: CarreraModel;
  //usuario: UsuarioModel = new UsuarioModel();
  evaluador: EvaluadorModel = new EvaluadorModel();

    constructor( private fb: FormBuilder,
      private proyectosService: ProyectosService,
      private criteriosService: CriteriosService,
      private evaluadoresService: EvaluadoresService,
      private carrerasService: CarrerasService,
      private categoriasService: CategoriasService,
      private usersService: UserService,
      private route: ActivatedRoute) { 

       this.crearFormulario();
       //this.criteriosService.getCriterios();

      }

      ngOnInit() {

        //let valorTotal = this.proyecto.totalPuntaje;
        const id = this.route.snapshot.paramMap.get('id');
    
        //console.log(this.criterios.values);
        /*if ( id !== 'nuevo' ) {
    
          this.usersService.getUsuarios( uid )
            .subscribe( (resp: UsuarioModel) => {
              this.usuario = resp;
              //this.usuario.uid = uid;
            });
    
        }*/
    
        //this.cargarCategorias();
    
        //PARA ASIGNAR carrera  AL usuario
        this.carrerasService.getCarreras()
        .subscribe( carreras => {
          this.carreras = carreras;
    
          this.carreras.unshift({
            descripcion: '[ Seleccione Carrera]',
            id: ''
          })
    
          // console.log( this.paises );
        });
    
        //PARA ASIGNAR CATEGORIA AL USUARIO
        this.categoriasService.getCategorias()
        .subscribe( categorias => {
          
          this.categorias = categorias;
    
          this.categorias.unshift({
            descripcion: '[ Seleccione Categoria]',
            id: ''
          })
    
          // console.log( this.paises );
        });
    
        /*this.carrerasService.getCarreras()
        .subscribe( carreras => {
          this.carreras = carreras;
    
          this.carreras.unshift({
            descripcion: '[ Seleccione Carrera]',
            id: ''
          })
         });*/
    
          // console.log( this.paises );
       
        /*this.disertantesService.get('hospital').valueChanges
            .subscribe( categoriaId => {
              this.categoriaSeleccionadah = this.categorias.find( h => h.id === categoriaId );
            })*/
      }


      crearFormulario() {
        this.forma = this.fb.group({
          id  : ['' ],
          nombre  : ['', Validators.required ],
          //documento: ['', [Validators.required, Validators.minLength(10) ] ],
          password  : ['', Validators.required],
          usuario  : ['', Validators.required ],
          //carrera  : ['' ],
          //rol  : ['' ],
          //cuerpo  : ['', [ Validators.required, Validators.minLength(50) ]  ],
          //email  : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
          //usuario : ['', , this.validadores.existeUsuario ],
          //pass1   : ['', Validators.required ],
          //pass2   : ['', Validators.required ],
        
          //pasatiempos: this.fb.array([])
        },{
          //validators: this.validadores.passwordsIguales('pass1','pass2')
        });
    
      }
    

    
      guardar( ) {
    
        if (this.forma.invalid) {

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Formulario no valido!'
            //footer: '<a href="">Why do I have this issue?</a>'
          })
          console.log('Formulario no válido');
          return;
        }
    
        this.evaluador.rol = "administrador";

        Swal.fire({
          title: 'Espere',
          text: 'Guardando información',
          icon: 'info',
          allowOutsideClick: false
        });
    
       // Swal.showLoading();
    
        let peticion: Observable<any>;
    
        if ( this.evaluador.id ) {
          peticion = this.evaluadoresService.actualizarEvaluador( this.evaluador );
        } else {
          peticion = this.evaluadoresService.crearEvaluador(this.evaluador );
        }
    
        peticion.subscribe( resp => {
    
        /*Swal.fire({
          title: this.carrera.descripcion,
          text: 'Se actualizó correctamente',
          type: 'success'
        });*/
    
        });
    
       
        console.log(this.evaluador);
        console.log(this.forma);

        //window.location.reload();
      }
    
      // guardar( form: NgForm ) {
    
      //   if ( form.invalid ) {
      //     console.log('Formulario no válido');
      //     return;
      //   }
    
      //   /*Swal.fire({
      //     title: 'Espere',
      //     text: 'Guardando información',
      //     type: 'info',
      //     allowOutsideClick: false
      //   });*/
    
      //   //Swal.showLoading();
    
      //   let peticion: Observable<any>;
    
      //   if ( this.proyecto.id ) {
      //     peticion = this.proyectosService.actualizarProyecto( this.proyecto );
      //   } else {
      //     peticion = this.proyectosService.crearProyecto(this.proyecto );
      //   }
    
      //   peticion.subscribe( resp => {
    
      //   /*Swal.fire({
      //     title: this.carrera.descripcion,
      //     text: 'Se actualizó correctamente',
      //     type: 'success'
      //   });*/
    
      //   });
    
      //   console.log(form);
      //   console.log(this.proyecto);
      //   console.log(this.forma);
    
      // }
    
      /*cargarDisertantes() {
    
        this.disertantesService.getDisertantes()
          .subscribe( (disertantes: DisertanteModel[]) => {
            this.disertantes = disertantes;
          })
    
      }*/
     

}
