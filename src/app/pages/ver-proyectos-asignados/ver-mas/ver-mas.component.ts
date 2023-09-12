import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CriterioModel } from 'src/app/models/criterio.model';
import { EvaluadorModel } from 'src/app/models/evaluador.model';
import { ProyectoModel } from 'src/app/models/proyecto.model';
import { AuthService } from 'src/app/services/auth.service';
import { CriteriosService } from 'src/app/services/criterios.service';
import { EvaluadoresService } from 'src/app/services/evaluadores.service';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-ver-mas',
  templateUrl: './ver-mas.component.html',
  styleUrls: ['./ver-mas.component.css']
})
export class VerMasComponent implements OnInit {

  roleUser:string;
  evaluadores: EvaluadorModel[] = [];

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
               private router: Router,
               private auth: AuthService) { 

                this.criterioLength();

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



 criterioLength(){
  this.criteriosService.getCriterios()
    .subscribe( resp => {
      this.criterios = resp;
      console.log("Cantidad de criterios: ", this.criterios.length);
      this.lenght = this.criterios.length;
    });
 }


}
