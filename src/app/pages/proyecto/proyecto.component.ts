import { CategoriasService } from 'src/app/services/categorias.service';
import { CategoriaModel } from 'src/app/models/categoria.model';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DisertanteModel } from '../../models/disertante.model';
import { ProyectoModel } from '../../models/proyecto.model';
import { ProyectosService } from '../../services/proyectos.service';
import { DisertantesService } from '../../services/disertantes.service';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CriteriosService } from 'src/app/services/criterios.service';
import { CriterioModel } from 'src/app/models/criterio.model';
import { EvaluadorModel } from 'src/app/models/evaluador.model';
import { EvaluadoresService } from 'src/app/services/evaluadores.service';
import { CarreraModel } from 'src/app/models/carrera.model';
import { CarrerasService } from 'src/app/services/carreras.service';

import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  roleUser:string;
  //evaluadores: EvaluadorModel[] = [];

  areaTematica:any;
  forma: FormGroup;
  public categorias: CategoriaModel[] = [];
  public criterios: CriterioModel[] = [];
  public evaluadores: EvaluadorModel[] = [];
  public evaluador: EvaluadorModel = new EvaluadorModel()
  public evaluador1: EvaluadorModel = new EvaluadorModel()
  public evaluador2: EvaluadorModel = new EvaluadorModel()
  public evaluador3: EvaluadorModel = new EvaluadorModel()
  public evaluadoresProye: EvaluadorModel = new EvaluadorModel()
  public disertantes: DisertanteModel[] = [];
  public carreras: CarreraModel[] = [];
  public carrera: CarreraModel = new CarreraModel;
  public disertanteSeleccionado: DisertanteModel;
  public disertante: DisertanteModel;
  //public carreraSeleccionada: CarreraModel;
  proyecto: ProyectoModel = new ProyectoModel();

  constructor(private fb: FormBuilder,
    private categoriasService: CategoriasService,
    private proyectosService: ProyectosService,
    private criteriosService: CriteriosService,
    private evaluadoresService: EvaluadoresService,
    private disertantesService: DisertantesService,
    private carrerasService: CarrerasService,
    private route: ActivatedRoute,
    private auth: AuthService) {
      
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
    // let valorTotal = this.proyecto.totalPuntaje;
    const id = this.route.snapshot.paramMap.get('id');
    //console.log(this.criterios.values);
    if (id !== 'nuevo') {
      this.proyectosService.getProyecto(id)
        .subscribe((resp: ProyectoModel) => {
          this.proyecto = resp;
          this.proyecto.id = id;
        });
    }



    this.carrerasService.getCarreras()
      .subscribe(carreras => {
        this.carreras = carreras;
        this.carreras.unshift({
          descripcion: '[ Seleccione Área]',
          id: ''
        })
        //console.log(this.carreras)
      });


      
      this.forma.controls["carrera"].valueChanges.subscribe((area: CarreraModel) => {
        console.log(area.descripcion);
        this.areaTematica = area.descripcion;
        
      });
      //PARA ASIGNAR DISERTANTES  AL PROYECTO
      //if (this.areaTematica == this.disertante.area) {
       // console.log(this.disertante.area)
        this.disertantesService.getDisertantes()
        .subscribe(disertantes => {
          this.disertantes = disertantes;
          this.disertantes.unshift({
            nombre: '[ Seleccione Autor]',
            id: ''
          })
        });

      //}

      



      this.categoriasService.getCategorias()
      .subscribe( categorias => {
        this.categorias = categorias;
        this.categorias.unshift({
          descripcion: '[ Seleccione Categoría]',
          id: ''
        })
  
        // console.log( this.paises );
      });

    //PARA ASIGNAR EVALUADORES A PROYECTO
    /*
        this.evaluadoresService.getEvaluadores()
        .subscribe( evaluadores => {
          if(!this.proyecto.id){
            this.proyecto.evaluadores = evaluadores
            //this.setValorDefaultEval(this.proyecto)
          }
          this.evaluadores = evaluadores;
          this.evaluadores.unshift({
            nombre: '[ Seleccione Evaluador]',
            id: ''
          })*/

    //console.log( this.proyecto.evaluadores );
    //});

    this.criteriosService.getCriterios()
      .subscribe(criterios => {
        this.criterios = criterios
        console.log(this.criterios);
      });


    this.forma.controls["carrera"].valueChanges.subscribe((c: CarreraModel) => {
      console.log(c)
      this.carrera = c
      this.evaluadores = c.evaluadores
    })
    
    this.forma.controls["evaluador1"].valueChanges.subscribe((e: EvaluadorModel) => {
      this.proyecto.evaluador1 = this.getEvaluador(e)
    })
    this.forma.controls["evaluador2"].valueChanges.subscribe((e: EvaluadorModel) => {
      this.proyecto.evaluador2 = this.getEvaluador(e)
    })
    /*this.forma.controls["evaluador3"].valueChanges.subscribe((e: EvaluadorModel) => {
      this.proyecto.evaluador3 = this.getEvaluador(e)
    })*/

    /*this.forma.controls["evaluador2"].valueChanges.subscribe((e: EvaluadorModel) => {
      this.proyecto.evaluador2 = this.getEvaluador(e)
    })*/

  }





  get evaluadoresProyecto() {
    return this.forma.get('evaluadoresProyecto') as FormArray;
  }

  /*mostrarListado(){
    var lista='';
    for(var i=0; i<jugadores.length; i++){
      lista+= 'id: ' + jugadores[i].id +
        ' nombre: ' + jugadores[i].name + 
        ' edad: ' + jugadores[i].edad + 
        ' dinero: ' + jugadores[i].dinero + '\n';
    }
    document.getElementById('listado').innerText = lista;
  }*/

  getEvaluador(evaluador: EvaluadorModel): EvaluadorModel {
    let e = Object.assign({}, evaluador)
    e.criterios = this.criterios
    this.setValorDefault(e)
    return e
  }

  getAutor(autor: DisertanteModel): DisertanteModel {
    let e = Object.assign({}, autor)
    //e.area = this.criterios
    //this.setValorDefault(e)
    return e
  }

  setValorDefault(evaluador: EvaluadorModel) {
    evaluador.criterios.forEach(criterio => {
      criterio.puntajeAsignado = 0
    });
  }

  setValorTotal(proyecto: ProyectoModel) {

  }

  crearFormulario() {
    this.forma = this.fb.group({
      id: [''],
      titulo: ['', Validators.required],
      categoria: ['', Validators.required],
      codigo: ['', [Validators.required, Validators.minLength(2)]],
      autor: ['', Validators.required],
      carrera: ['', Validators.required],
      area: [''],
      //evaluadoresProyecto: this.fb.array([]),
      evaluadoresPro: this.fb.group({
        evaluador2: ['' ],
        evaluador3: ['' ],
      }),
      evaluador1: ['', Validators.required],
      evaluador2: [''],
      cuerpo: ['', [Validators.required, Validators.minLength(50)]],
      //email  : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      //usuario : ['', , this.validadores.existeUsuario ],
      //pass1   : ['', Validators.required ],
      //pass2   : ['', Validators.required ],
      /* criterios: this.fb.group({
 
         el_expositor_seadecua_al_tiempo_estipulado: this.fb.group({
           p1: [0, Validators.required ],
           p2: [0, Validators.required ],
           p3: [0, Validators.required ],
         }),
         
       }),
       criterioss: this.fb.array([
 
         this.initCriterios()
         
       ]),*/
      //pasatiempos: this.fb.array([])
    }, {
      //validators: this.validadores.passwordsIguales('pass1','pass2')
    });

  }

  initCriterios() {
    return this.fb.group({
      name: ['', Validators.required],
      manufacturerName: ['', Validators.required]
    })
  }


  agregarEvaluador() {
    this.evaluadoresProyecto.push(  this.fb.control('')  );
  }
  
  borrarEvaluador(i: number) {
    this.evaluadoresProyecto.removeAt(i);
  }


  guardar() {

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

    
    this.proyecto.area = this.areaTematica;
    if (this.proyecto.id) {
      peticion = this.proyectosService.actualizarProyecto(this.proyecto);
    } else {
      peticion = this.proyectosService.crearProyecto(this.proyecto);
    }

    peticion.subscribe(resp => {
      this.actualizarCarrera(this.proyecto)

      Swal.fire({
        title: this.proyecto.titulo,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });

    });

    console.log();
    console.log(this.proyecto);
    console.log(this.forma);
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

actualizarCarrera(proyecto: ProyectoModel) {
  let newProyecto = Object.assign({}, proyecto)
  let newCarrera = Object.assign({},this.carrera)
  if(newCarrera.proyectos == undefined){
    newCarrera.proyectos = []
  }
  if (newCarrera.proyectos.some(({id}) => id == proyecto.id)){
    newCarrera.evaluadores.forEach((e,index)=>{
      if(e.id == newProyecto.id) newCarrera.evaluadores.splice(index,1)
    });
  }
  newCarrera.proyectos.push(newProyecto)
  let response = this.carrerasService.actualizarCarera(newCarrera)
  response.subscribe(resp =>{
    console.log(resp)
  })
}
}