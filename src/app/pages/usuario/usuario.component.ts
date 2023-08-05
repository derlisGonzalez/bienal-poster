import { EvaluadoresService } from './../../services/evaluadores.service';
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
import { ProyectosService } from 'src/app/services/proyectos.service';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { CarrerasService } from 'src/app/services/carreras.service';
import { CarreraModel } from 'src/app/models/carrera.model';

import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  roleUser:string;
  //evaluadores: EvaluadorModel[] = [];

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
      private route: ActivatedRoute,
      private auth: AuthService,
      private evaluadorService: EvaluadoresService) { 

       this.crearFormulario();
       //this.criteriosService.getCriterios();

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
          nombre: ['', Validators.required ],
          email: ['', [ Validators.required, Validators.email ] ],
          password: ['', Validators.required ],
          password2: ['', Validators.required ],
          //documento: ['', Validators.required ],
          //carrera: ['', ],
          //terminos: [ true, Validators.required ],
          //role: [ true, Validators.required ],
        }, {
          validators: this.passwordsIguales('password', 'password2')
        });
    
      }


      passwordsIguales(pass1Name: string, pass2Name: string ) {
        return ( formGroup: FormGroup ) => {
    
          const pass1Control = formGroup.get(pass1Name);
          const pass2Control = formGroup.get(pass2Name);
    
          if ( pass1Control.value === pass2Control.value ) {
            pass2Control.setErrors(null)
          } else {
            pass2Control.setErrors({ noEsIgual: true })
          }
    
        }
      }



      onSubmit( ) {
        if ( this.forma.invalid ) { return; }
        Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          text: 'Espere por favor...'
        });
        Swal.showLoading();

        this.auth.nuevoAdmin( this.evaluador )
          .subscribe( resp => {
            
            console.log(resp);
            console.log("Local id del usuario activo: "+resp['localId']);
     
            //this.usuario.uid = resp['localId'];
    
            //let uid = resp['localId'];
    
            
            //this.usuario.role = 'visitante';
            /*this.auth.crearUser(this.usuario)
            .subscribe( resp2 => { 
              this.usuario.uid = resp['localId'];
              this.usuario.role = 'visitante';
              //this.evaluador.uid = uid;
              //this.usuario = resp2;
              //this.usuario.id = resp2.uid;
              this.usuario.role = "evaluador";
              this.usuario.email = resp2.email;
              this.usuario.nombre = resp2.nombre;
              console.log(resp2);
            });*/
    
            this.evaluador.uid = resp['localId'];
            //this.evaluador.id = resp['localId'];
           // this.evaluador.carrera = this.carrera;
            this.evaluador.role = "admin";
            this.evaluadorService.crearEvaluador(this.evaluador)
            .subscribe( resp3 => { 
              //this.actualizarCarrera(this.carrera, this.evaluador);
              //this.evaluador.id = resp['localId'];
              //console.log(resp3)
              /*Swal.fire({
                title: this.evaluador.nombre,
                text: 'Se actualizó correctamente',
                icon: 'success'
              });*/
              
              //this.evaluador.role = 'visitante';
              //this.evaluador.email = resp['email'];
              //this.evaluador.nombre = resp['nombre'];
              //this.evaluador.habilitado = resp['nombre'];
              console.log(resp3);
            });
            
    
    
    
            Swal.close();
         
            //const uid = resp.locali;
            /*if ( this.recordarme ) {
              localStorage.setItem('email', this.usuario.email);
            }*/
    
            //this.router.navigateByUrl('/inicio');
    
            this.forma.reset();
          }, (err) => {
            console.log(err.error.error.message);
            Swal.fire({
              icon: 'error',
              title: 'Error al autenticar',
              text: err.error.error.message
            });
          });
    
          
    
          //this.usuario.role = 'visitante';
          /*this.auth.crearUser(this.usuario)
          .subscribe( resp2 => { 
            
            this.usuario = resp2;
            this.usuario.id = resp2.uid;
            this.usuario.role = "evaluador";
            this.usuario.email = resp2.email;
            this.usuario.nombre = resp2.nombre;
            console.log(resp2);
          });*/
    

          //this.forma.reset({ });

          //location.reload();
      
    
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
    
        //this.evaluador.rol = "administrador";

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
