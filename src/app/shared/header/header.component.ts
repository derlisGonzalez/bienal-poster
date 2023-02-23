import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( private router:Router,
                private auth:AuthService ) { }

  ngOnInit(): void {
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
