import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { EvaluadorModel } from 'src/app/models/evaluador.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userActivo = localStorage.getItem('email');

  roleUser:string;
 
  //role:string = this.roleUser;

  evaluadores: EvaluadorModel[] = [];


  constructor( private router:Router,
                private auth:AuthService ) { 

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


  ngOnInit(): void {
    console.log("Usuario logueado: "+localStorage.getItem('email'));
    //localStorage.removeItem('role');
    
  }

    buscarProyecto( termino:string ){
     //console.log(termino);
    this.router.navigate( ['/buscar',termino] );
  }

  salir() {

    this.auth.logout();
    this.router.navigateByUrl('/login');

  }

}
