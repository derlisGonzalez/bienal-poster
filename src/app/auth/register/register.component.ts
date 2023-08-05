import { EvaluadorModel } from './../../models/evaluador.model';
import { EvaluadoresService } from './../../services/evaluadores.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UsuarioModel } from './../../models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import Swal from 'sweetalert2'
import { CarreraModel } from 'src/app/models/carrera.model';
import { CarrerasService } from 'src/app/services/carreras.service';
import { CriterioModel } from 'src/app/models/criterio.model';
import { CriteriosService } from 'src/app/services/criterios.service';

//import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  forma: FormGroup;
  
  public carrera: CarreraModel = new CarreraModel;
  evaluador: EvaluadorModel = new EvaluadorModel();
  public carreras: CarreraModel[] = [];
  public criterios: CriterioModel[] = [];

  usuario: UsuarioModel;
  //evaluador: EvaluadorModel;
  recordarme = false;

  public formSubmitted = false;


  constructor( private fb: FormBuilder,
               private auth: AuthService,
               private userService: UserService,
               private evaluadorService: EvaluadoresService,
               private carrerasService: CarrerasService,
               private criteriosService: CriteriosService,
               private route: ActivatedRoute,
               private router: Router ) {

                this.crearFormulario();

                }

  ngOnInit() {
    this.usuario = new UsuarioModel();

    /*const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'register') {
      this.evaluadorService.getEvaluador(id)
        .subscribe((resp: EvaluadorModel) => {
          this.evaluador = resp;
          delete this.evaluador.carrera.evaluadores
          this.evaluador.id = id;
        });
    }*/



    
    this.carrerasService.getCarreras()
      .subscribe(carreras => {
        this.carreras = carreras;
        this.carreras.unshift({
          descripcion: '[ Seleccione su Área]',
          id: ''
        })
        console.log(this.carreras);
      });

    console.log(this.criterios.values);

    this.criteriosService.getCriterios()
      .subscribe(criterios => {
        if (!this.evaluador.id) {
          this.evaluador.criterios = criterios
          this.setValorDefault(this.evaluador)
        }
        //this.setValorDefault(this.proyecto) // crear un valor default para puntajeAsignado
        // puede ser opcional porque
        //se puede guardar sin el valor y cargar unicamente en la hora de 
        //calificar ya que el modelo de la base de datos es flexible
        console.log(this.evaluador.criterios);
      });
  }

  /*get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }*/

  
  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }

  get documentoNoValido() {
    return this.forma.get('documento').invalid && this.forma.get('documento').touched
  }

  /*get apellidoNoValido() {
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched
  }*/

  get correoNoValido() {
    return this.forma.get('email').invalid && this.forma.get('email').touched
  }

  /*get usuarioNoValido() {
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched
  }*/

  /*get distritoNoValido() {
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched
  }*/

  /*get ciudadNoValido() {
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched
  }*/

  get pass1NoValido() {
    return this.forma.get('password').invalid && this.forma.get('password').touched;
  }

  get pass2NoValido() {
    const password = this.forma.get('password').value;
    const password2 = this.forma.get('password2').value;

    return ( password === password2 ) ? false : true;
  }

  crearFormulario() {

    this.forma = this.fb.group({
      nombre: ['', Validators.required ],
      email: ['', [ Validators.required, Validators.email ] ],
      password: ['', Validators.required ],
      password2: ['', Validators.required ],
      documento: ['', Validators.required ],
      carrera: ['', ],
      //terminos: [ true, Validators.required ],
      //role: [ true, Validators.required ],
    }, {
      validators: this.passwordsIguales('password', 'password2')
    });

  }

  onSubmit( ) {
    if ( this.forma.invalid ) { return; }
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    
    this.auth.nuevoUsuario( this.evaluador )
      .subscribe( resp => {
        
        console.log(resp);
        //console.log("Local id del usuario activo: "+resp['localId']);

        const uid = resp['localId'];
        //if (uid == this.auth.getEvaluadorLogueado()) {
          /*this.auth.getEvaluadorLogueado(uid)
          .subscribe(respuesta => {
            console.log("DATOS DEL USUARIO LOGUEADO... "+ respuesta);
            //this.evaluador = resp;
            //delete this.evaluador.carrera.evaluadores
            //this.evaluador.id = id;
          });*/
        //}
  
        
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
        this.evaluador.carrera = this.carrera;
        this.evaluador.role = "evaluador";
        this.evaluadorService.crearEvaluador(this.evaluador)
        .subscribe( resp3 => { 
          this.actualizarCarrera(this.carrera, this.evaluador);
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
          this.forma.reset();

        });
        



        Swal.close();
     
        //const uid = resp.locali;
        /*if ( this.recordarme ) {
          localStorage.setItem('email', this.usuario.email);
        }*/

        //this.router.navigateByUrl('/inicio');


        //this.forma.reset();
        
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

    
      //PARA NO GUARDAR LA COTRASENHA EN EL OBJETO EVALUADORES
      /*this.evaluador.password = null;
      this.evaluador.password2 = null;*/

  }


  guardar() {
    
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

    //this.evaluador.rol = "evaluador";

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;
    this.evaluador.carrera = this.carrera
    if (this.evaluador.id) {
      peticion = this.evaluadorService.actualizarEvaluador(this.evaluador);
    } else {
      peticion = this.evaluadorService.crearEvaluador(this.evaluador);
    }

    peticion.subscribe(resp => {
      this.actualizarCarrera(this.carrera, this.evaluador)
      console.log(resp)
      Swal.fire({
        title: this.evaluador.nombre,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });

     // this.forma.reset();
    });



    console.log(this.forma);
    //window.location.reload();
    //this.forma.reset({ id: ''});

    this.auth.nuevoUsuario( this.evaluador )
    .subscribe( resp => {
      
      console.log(resp);
      console.log("Local id del usuario activo: "+resp['localId']);

      
      //this.usuario.uid = resp['localId'];

      //let uid = resp['localId'];


      Swal.close();
   
      //const uid = resp.locali;
      /*if ( this.recordarme ) {
        localStorage.setItem('email', this.usuario.email);
      }*/

     //this.router.navigateByUrl('/inicio');

    }, (err) => {
      console.log(err.error.error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error al autenticar',
        text: err.error.error.message
      });
    });

    
  }
  

  actualizarCarrera(carrera: CarreraModel, evaluador: EvaluadorModel) {
    let newEvaluador = Object.assign({}, evaluador)
    let newCarrera = Object.assign({},carrera)
    delete newEvaluador.carrera
    delete newEvaluador.criterios
    if(newCarrera.evaluadores == undefined){
       newCarrera.evaluadores = []
    }
    if (newCarrera.evaluadores.some(({id}) => id == evaluador.id)){
      newCarrera.evaluadores.forEach((e,index)=>{
        if(e.id == newEvaluador.id) newCarrera.evaluadores.splice(index,1)
      });
    }
    
    newCarrera.evaluadores.push(newEvaluador)
    let response = this.carrerasService.actualizarCarera(newCarrera)
    response.subscribe(resp =>{
      console.log(resp)
    })
  }

  setValorDefault(evaluador: EvaluadorModel) {
    evaluador.criterios.forEach(criterio => {
      criterio.puntajeAsignado = 0
    });
  }


  /*crearUsuario() {
    this.formSubmitted = true;
    console.log( this.registerForm.value );

    if ( this.registerForm.invalid ) {
      return;
    }

    // Realizar el posteo
    this.userService.crearUser( this.registerForm.value )
        .subscribe( resp => {
          console.log("usuario creado");
          console.log(resp);
          // Navegar al Dashboard
          //this.router.navigateByUrl('/');

        }, (err) => {
          // Si sucede un error
          Swal.fire('Error', err.error.msg, 'error' );
        });


  }*/

  campoNoValido( campo: string ): boolean {
    
    if ( this.forma.get(campo).invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }

  }

  contrasenasNoValidas() {
    const pass1 = this.forma.get('password').value;
    const pass2 = this.forma.get('password2').value;

    if ( (pass1 !== pass2) && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }

  }

  aceptaTerminos() {
    return !this.forma.get('terminos').value && this.formSubmitted;
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

}
