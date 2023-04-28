import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EvaluadorModel } from '../../models/evaluador.model';
import { EvaluadoresService } from '../../services/evaluadores.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CarreraModel } from 'src/app/models/carrera.model';
import { CarrerasService } from 'src/app/services/carreras.service';
import { CriterioModel } from 'src/app/models/criterio.model';
import { CriteriosService } from 'src/app/services/criterios.service';

import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-evaluador',
  templateUrl: './evaluador.component.html',
  styleUrls: ['./evaluador.component.css']
})
export class EvaluadorComponent implements OnInit {

  roleUser:string;
  evaluadores: EvaluadorModel[] = [];

  forma: FormGroup;

  public carreras: CarreraModel[] = [];
  
  public carrera: CarreraModel = new CarreraModel;
  public criterios: CriterioModel[] = [];
  evaluador: EvaluadorModel = new EvaluadorModel();

  constructor(private fb: FormBuilder,
    private evaluadoresService: EvaluadoresService,
    private criteriosService: CriteriosService,
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
    
    //CUANDO SE TIENE QUE ACTUALIZAR UN EVALUADOR
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      this.evaluadoresService.getEvaluador(id)
        .subscribe((resp: EvaluadorModel) => {
          this.evaluador = resp;
          delete this.evaluador.carrera.evaluadores
          this.evaluador.id = id;
        });
    }

    this.carrerasService.getCarreras()
      .subscribe(carreras => {
        this.carreras = carreras;
        this.carreras.unshift({
          descripcion: '[ Seleccione Carrera]',
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

 
  /*thispruebaKey() {
    this.forma.get('nombre').setValue(this.forma.get('usuario').value);
  }*/


  setValorDefault(evaluador: EvaluadorModel) {
    evaluador.criterios.forEach(criterio => {
      criterio.puntajeAsignado = 0
    });
  }

  crearFormulario() {
    this.forma = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      carrera: ['', [Validators.required]],
      //criterios: ['', [Validators.required, Validators.minLength(2)]],
      documento: ['', [Validators.required]],
      //password: ['', [Validators.required]],
      //rol: ['evaluador'],
      //usuario: ['', [Validators.required]],
      subtotal: [''],
      //cuerpo: ['', [Validators.required, Validators.minLength(50)]],
      //totalPuntaje: [''],
      //email  : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      //usuario : ['', , this.validadores.existeUsuario ],
      //pass1   : ['', Validators.required ],
      //pass2   : ['', Validators.required ],
      //pasatiempos: this.fb.array([])
    });

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
      peticion = this.evaluadoresService.actualizarEvaluador(this.evaluador);
    } else {
      peticion = this.evaluadoresService.crearEvaluador(this.evaluador);
    }
    peticion.subscribe(resp => {
      this.actualizarCarrera(this.carrera, this.evaluador)
      console.log(resp)
      Swal.fire({
        title: this.evaluador.nombre,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });
    });



    console.log(this.forma);
    //window.location.reload();
    //this.forma.reset({ id: ''});
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
  /*cargarCarreras() {
    this.carrerasService.getCarreras()
      .subscribe( (carreras: CarreraModel[]) => {
        this.carreras = carreras;
      })
  }*/
}