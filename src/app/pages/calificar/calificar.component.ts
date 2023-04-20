import { EvaluadoresService } from './../../services/evaluadores.service';
import { EvaluadorModel } from './../../models/evaluador.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CriterioModel } from 'src/app/models/criterio.model';
import { ProyectoModel } from 'src/app/models/proyecto.model';
import { CriteriosService } from 'src/app/services/criterios.service';
import { ProyectosService } from 'src/app/services/proyectos.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-calificar',
  templateUrl: './calificar.component.html',
  styleUrls: ['./calificar.component.css']
})


export class CalificarComponent implements OnInit {

  puntosTem: CriterioModel[] = [];
  puntos: CriterioModel[] = [];
  evaluador: EvaluadorModel;
  public criterios: CriterioModel[] = [];
  lenght = 0;


  //public carreras: CarreraModel[] = [];
  public criterioSeleccionado: CriterioModel;
  //public carreraSeleccionada: CarreraModel;
  public proyecto: ProyectoModel = new ProyectoModel();

  constructor( private proyectosService: ProyectosService,
               private criteriosService: CriteriosService,
               private evaluadoresService: EvaluadoresService,
               private route: ActivatedRoute,
               private router: Router) { 

                this.criterioLength();

               }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if ( id !== 'nuevo' ) {
      this.proyectosService.getProyecto( id )
        .subscribe( (resp: ProyectoModel) => {
          this.proyecto = resp;
          this.proyecto.id = id;
        });

    }
   
   
    this.criteriosService.getCriterios()
    .subscribe( criterios => {
     // this.criterios = criterios;

      /*this.criterios.unshift({
        descripcion: '',
        id: ''
      })*/

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

  /*onclick(prouser){
    this.puntos.push(prouser.value);
    prouser.value
  }*/

  onItemChange(value: CriterioModel){

    //verfificar que no este en el array por el id de criterio remover y colocar nuevamente
    //Eliminar el último elemento de un Array
    //this.puntos.pop

    //AÑADIR el último elemento de un Array 
    //this.puntos.push(value);

    //Añadir un elemento al principio de un Array
    //this.puntos.unshift(value);

    //DESCOMENTAR------------------------------------
    /*let result = this.puntos.filter((item,index)=>{
      return this.puntos.indexOf(item) === index;
    })
    console.log(result); //[1,2,6,5,9,'33']*/

    

    /*for (let index = 0; index < this.puntos.length; index++) {

      if (value.id) {
      
      }
      
  
      
      this.puntos["id"]
    }*/

    
    //console.log(value.puntajeAsignado);

    //console.log(this.puntos);

    //console.log(this.subTotal());
 }

 removerObjeto(value: CriterioModel) {

      //AÑADIR el último elemento de un Array 
      this.puntosTem.push(value);

      //Añadir un elemento al principio de un Array
      //this.puntos.unshift(value);
  
      this.puntos = this.puntosTem.filter((item,index)=>{
        return this.puntosTem.indexOf(item) === index;
      })

      console.log(this.puntos); 
      
 }



 subTotal1() {
  let suma = 0;
  this.puntos.forEach( function(punto){
    suma    += Number(punto.puntajeAsignado);
  })
  

  console.log("Suma: ", suma);

  //this.proyecto.evaluador1.subtotal = suma;
  this.proyecto.totalPuntaje += suma;
  this.proyecto.estado = false;
  //this.proyecto.evaluador1.estado = false;
  /*if (this.proyecto.evaluador1.estado == false && this.proyecto.evaluador2.estado == false) {
    let subtotal = (this.proyecto.totalPuntaje / 2);
    let sub = subtotal.toFixed(2);
    this.proyecto.promedio = Number(sub);
    this.proyecto.estado = false;
  }*/
  

  //console.log(this.proyecto.evaluador1.subtotal);
  
  //const suma = this.puntos.map(item => Number(item.puntajeAsignado)).reduce((prev, curr) => prev + curr, 0);
  //console.log(suma);

  //console.log(value.id);

  /*for (let index = 0; index < this.puntos.length; index++) {
    suma += Number(value);

    //this.puntos["id"]
  }*/

  console.log("La suma es : ", suma);

  
 }


 subTotal2() {
  let suma = 0;
  this.puntos.forEach( function(punto){
    suma    += Number(punto.puntajeAsignado);
  })

  console.log("Suma: ", suma);

  this.proyecto.evaluador2.subtotal = suma;
  this.proyecto.totalPuntaje += suma;
  this.proyecto.evaluador2.estado = false;
  /*if (this.proyecto.evaluador1.estado == false && this.proyecto.evaluador2.estado == false) {
    let subtotal = (this.proyecto.totalPuntaje / 2);
    let sub = subtotal.toFixed(2);
    this.proyecto.promedio = Number(sub);
    this.proyecto.estado = false;
  }*/
  console.log(this.proyecto.evaluador2.subtotal);

  //const suma = this.puntos.map(item => Number(item.puntajeAsignado)).reduce((prev, curr) => prev + curr, 0);
  //console.log(suma);

  //console.log(value.id);

  /*for (let index = 0; index < this.puntos.length; index++) {
    suma += Number(value);

    //this.puntos["id"]
  }*/

  //console.log("La suma es : ", suma);  

  
 }


 /*subTotal3() {
  let suma = 0;
  this.puntos.forEach( function(punto){
    suma    += Number(punto.puntajeAsignado);
  })

  console.log("Suma: ", suma);

  this.proyecto.evaluador3.subtotal = suma;
  this.proyecto.totalPuntaje += suma;
  this.proyecto.evaluador3.estado = false;

  if (this.proyecto.evaluador1.estado == false && this.proyecto.evaluador2.estado == false && this.proyecto.evaluador3.estado == false) {
    let subtotal = (this.proyecto.totalPuntaje / 3);
    let sub = subtotal.toFixed(2);
    this.proyecto.promedio = Number(sub);
    this.proyecto.estado = false;
  }
  console.log(this.proyecto.evaluador3.subtotal);

  //const suma = this.puntos.map(item => Number(item.puntajeAsignado)).reduce((prev, curr) => prev + curr, 0);
  //console.log(suma);

  //console.log(value.id);

  //for (let index = 0; index < this.puntos.length; index++) {
    //suma += Number(value);

    //this.puntos["id"]
  //}

  //console.log("La suma es : ", suma);  

  
 }*/


 criterioLength(){
  this.criteriosService.getCriterios()
    .subscribe( resp => {
      this.criterios = resp;
      console.log("Cantidad de criterios: ", this.criterios.length);
      this.lenght = this.criterios.length;
    });
 }

  guardar( form: NgForm ) {
    
    //CAMBIAR VALOR DE ACUERDO A LA CANTIDAD DE CRITERIOS
    if ( this.puntos.length < this.lenght ) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Calificación incompleta'
      //footer: '<a href="">Why do I have this issue?</a>'
    })
    console.log('Formulario no válido');
    return;

    }

    Swal.fire({
      title: 'Espere',
      text: 'Calificación guardada',
      icon: 'info',
      allowOutsideClick: false
    });

    //Swal.showLoading();

    let peticion: Observable<any>;
    if ( this.proyecto.id ) {
      //se agrega los los crierios en el proyecto sin las calificaciones
      peticion = this.proyectosService.actualizarProyecto( this.proyecto );
      //peticion = this.proyectosService.actualizarSubTotal(this.proyecto.evaluador1.subtotal);
    } else {
      peticion = this.proyectosService.crearProyecto(this.proyecto );
    }


    peticion.subscribe( resp => {

    /*Swal.fire({
      title: this.carrera.descripcion,
      text: 'Se actualizó correctamente',
      type: 'success'
    });*/

    });

    console.log(form);
    console.log(this.proyecto);
    this.router.navigateByUrl('/calificaciones');

  }


  /*cargarDisertantes() {

    this.disertantesService.getDisertantes()
      .subscribe( (disertantes: DisertanteModel[]) => {
        this.disertantes = disertantes;
      })

  }*/

}
