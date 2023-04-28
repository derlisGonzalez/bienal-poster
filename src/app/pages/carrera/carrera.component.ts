import { Component, OnInit } from '@angular/core';
import { CarreraModel } from '../../models/carrera.model';
import { NgForm } from '@angular/forms';
import { CarrerasService } from '../../services/carreras.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';
import { EvaluadorModel } from 'src/app/models/evaluador.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-carrera',
  templateUrl: './carrera.component.html',
  styleUrls: ['./carrera.component.css']
})
export class CarreraComponent implements OnInit {

  roleUser:string;
  evaluadores: EvaluadorModel[] = [];

  carrera: CarreraModel = new CarreraModel();

  constructor( private carrerasService: CarrerasService,
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
                }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ) {

      this.carrerasService.getCarrera( id )
        .subscribe( (resp: CarreraModel) => {
          this.carrera = resp;
          this.carrera.id = id;
        });

    }
  }




  guardar( form: NgForm ) {

    if ( form.invalid ) {
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

    if ( this.carrera.id ) {
      peticion = this.carrerasService.actualizarCarera( this.carrera );
    } else {
      peticion = this.carrerasService.crearCarrera( this.carrera );
    }


    peticion.subscribe( resp => {

    Swal.fire({
      title: this.carrera.descripcion,
      text: 'Se actualizó correctamente',
      icon: 'success'
    });

    });

    console.log(form);
    console.log(this.carrera);

  }

}
