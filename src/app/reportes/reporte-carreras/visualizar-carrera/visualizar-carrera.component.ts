import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CarreraModel } from 'src/app/models/carrera.model';
import { CarrerasService } from 'src/app/services/carreras.service';

@Component({
  selector: 'app-visualizar-carrera',
  templateUrl: './visualizar-carrera.component.html',
  styleUrls: ['./visualizar-carrera.component.css']
})
export class VisualizarCarreraComponent implements OnInit {

  carreras: CarreraModel[] = [];
  carrera: CarreraModel = new CarreraModel();

  cargando = false;
  forma: FormGroup;
  constructor(private fb: FormBuilder,
              private carrerasService: CarrerasService,
              private route: ActivatedRoute,) { 

                this.crearFormulario();
              }

  ngOnInit(): void {
    console.log(this.carrerasService.getCarreras());
    this.cargando = true;

    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo') {

      this.carrerasService.getCarrera(id)
        .subscribe((resp: CarreraModel) => {
          this.carrera = resp;
          this.carrera.id = id;
        });

    }
  }


  crearFormulario() {
    this.forma = this.fb.group({
      id: ['', Validators.required],
      descripcion: ['', Validators.required],
      //codigo: ['', [Validators.required, Validators.minLength(5)]],
      //disertante: [''],
      //cuerpo: ['', [Validators.required, Validators.minLength(50)]],
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




  guardar() {

    /*Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      type: 'info',
      allowOutsideClick: false
    });*/

    //Swal.showLoading();

    let peticion: Observable<any>;

    if (this.carrera.id) {
      peticion = this.carrerasService.actualizarCarera(this.carrera);
    } else {
      peticion = this.carrerasService.crearCarrera(this.carrera);
    }


    peticion.subscribe(resp => {

      /*Swal.fire({
        title: this.carrera.descripcion,
        text: 'Se actualizó correctamente',
        type: 'success'
      });*/

    });

    console.log();
    console.log(this.carrera);
    console.log(this.forma);

  }

}
