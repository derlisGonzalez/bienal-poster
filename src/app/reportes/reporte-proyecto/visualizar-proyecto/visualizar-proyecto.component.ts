import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CriterioModel } from 'src/app/models/criterio.model';
import { DisertanteModel } from 'src/app/models/disertante.model';
import { ProyectoModel } from 'src/app/models/proyecto.model';
import { CriteriosService } from 'src/app/services/criterios.service';
import { DisertantesService } from 'src/app/services/disertantes.service';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-visualizar-proyecto',
  templateUrl: './visualizar-proyecto.component.html',
  styleUrls: ['./visualizar-proyecto.component.css']
})
export class VisualizarProyectoComponent implements OnInit {

  proyectos: ProyectoModel[] = [];

  cargando = false;
  forma: FormGroup;


  public criterios: CriterioModel[] = [];
  public disertantes: DisertanteModel[] = [];
  //public carreras: CarreraModel[] = [];
  public disertanteSeleccionado: DisertanteModel;
  //public carreraSeleccionada: CarreraModel;
  proyecto: ProyectoModel = new ProyectoModel();
  constructor(private fb: FormBuilder,
    private proyectosService: ProyectosService,
    private criteriosService: CriteriosService,
    private disertantesService: DisertantesService,
    private route: ActivatedRoute) {

    this.crearFormulario();
  }

  ngOnInit() {
    console.log(this.proyectosService.getProyectos());
    //this.proyectos = resp[Object.keys(resp)[index]].category;
    this.cargando = true;

    this.proyectosService.getProyectos()
      .subscribe(resp => {
        console.log(resp);
        //this.proyectos = resp[Object.keys(resp)[this.proyecto.totalPuntaje]].totalPuntaje;
        this.proyectos = resp;
        this.cargando = false;
      });


     


    let valorTotal = this.proyecto.totalPuntaje;
    const id = this.route.snapshot.paramMap.get('id');


    //console.log(this.criterios.values);
    if (id !== 'nuevo') {

      this.proyectosService.getProyecto(id)
        .subscribe((resp: ProyectoModel) => {
          this.proyecto = resp;
          this.proyecto.id = id;
        });

    }

    //this.cargarCategorias();



    this.disertantesService.getDisertantes()
      .subscribe(disertantes => {
        this.disertantes = disertantes;

        this.disertantes.unshift({
          nombre: '[ Seleccione Disertante]',
          id: ''
        })

        // console.log( this.paises );
      });

    this.criteriosService.getCriterios()
      .subscribe(criterios => {
        if (!this.proyecto.id) {
         // this.proyecto.criterios = criterios
         // this.setValorDefault(this.proyecto)
        }
        //this.setValorDefault(this.proyecto) // crear un valor default para puntajeAsignado
        // puede ser opcional porque
        //se puede guardar sin el valor y cargar unicamente en la hora de 
        //calificar ya que el modelo de la base de datos es flexible


        /*this.criterios.unshift({
          descripcion: '',
          id: ''
        })*/

        console.log(this.criterios);
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


  /*setValorDefault(proyecto: ProyectoModel) {
    proyecto.criterios.forEach(criterio => {
      criterio.puntajeAsignado = 0
    });
  }*/

  setValorTotal(proyecto: ProyectoModel) {

  }

  crearFormulario() {
    this.forma = this.fb.group({
      id: ['', Validators.required],
      titulo: ['', Validators.required],
      codigo: ['', [Validators.required, Validators.minLength(5)]],
      disertante: [''],
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


  guardar() {

    /*Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      type: 'info',
      allowOutsideClick: false
    });*/

    //Swal.showLoading();

    let peticion: Observable<any>;

    if (this.proyecto.id) {
      peticion = this.proyectosService.actualizarProyecto(this.proyecto);
    } else {
      peticion = this.proyectosService.crearProyecto(this.proyecto);
    }


    peticion.subscribe(resp => {

      /*Swal.fire({
        title: this.carrera.descripcion,
        text: 'Se actualizó correctamente',
        type: 'success'
      });*/

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

}
