import { UsuarioModel } from 'src/app/models/usuario.model';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { EvaluadorModel } from '../../models/evaluador.model';
import Swal from 'sweetalert2';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  evaluador: EvaluadorModel = new EvaluadorModel();
  evaluadores: EvaluadorModel[] = [];

  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;

  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '' , [ Validators.required, Validators.email ] ],
    password: ['', Validators.required ],
    remember: [false]
  });


  constructor( private auth: AuthService,
               private router: Router,
               private fb: FormBuilder,
               //private usuarioService: UsuarioService,
               private ngZone: NgZone ) { }

  ngOnInit(): void {
    /*if ( localStorage.getItem('email') ) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }*/
  }


  login( form: NgForm ) {

    if (  form.invalid ) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();


    this.auth.login( this.usuario )
      .subscribe( resp => {

        console.log(resp.valueOf());
        Swal.close();

        /*if ( this.recordarme ) {
          localStorage.setItem('email', this.usuario.email);
        }*/

        this.auth.getEvaluadores()
        .subscribe( respEval => {
          // resp.forEach( function(punto){
          //   suma    += Number(punto.puntajeAsignado);
          // })
          console.log(respEval.forEach);
  
          this.evaluadores = respEval;
          console.log(Object.values(this.evaluadores));
          console.log(Object.values(this.evaluadores));
          //console.log(JSON.stringify({ respEval }));
          //let data = JSON.stringify({ respEval });
          //console.log(data);
         
        });


        const uid = resp['localId'];
        //if (uid == this.auth.getEvaluadorLogueado()) {
          this.auth.getEvaluadorLogueado(uid)
          .subscribe(respuesta => {
            console.log("DATOS DEL USUARIO LOGUEADO... "+ respuesta);
            //this.evaluador = resp;
            //delete this.evaluador.carrera.evaluadores
            //this.evaluador.id = id;
          });
        //}


        this.router.navigateByUrl('/inicio');

      }, (err) => {

        console.log(err.error.error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          text: err.error.error.message
        });
      });

  }

  /*hacerLogin(){
    console.log(this.evaluador);
    this.authService.fazerLogin(this.evaluador);
  }*/


  /*login( form: NgForm) {

    this.usuarioService.login( this.loginForm.value )
      .subscribe( resp => {

        if ( this.loginForm.get('remember').value ){ 
          localStorage.setItem('email', this.loginForm.get('email').value );
        } else {
          localStorage.removeItem('email');
        }

        // Navegar al Dashboard
        this.router.navigateByUrl('/');

      }, (err) => {
        // Si sucede un error
        Swal.fire('Error', err.error.msg, 'error' );
      });

  }*/
  
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();

  }

  async startApp() {
    
    //await this.usuarioService.googleInit();
    //this.auth2 = this.usuarioService.auth2;

    this.attachSignin( document.getElementById('my-signin2') );
    
  };

  attachSignin(element) {
    
    this.auth2.attachClickHandler( element, {},
        (googleUser) => {
            const id_token = googleUser.getAuthResponse().id_token;
            // console.log(id_token);
            /*this.usuarioService.loginGoogle( id_token )
              .subscribe( resp => {
                // Navegar al Dashboard
                this.ngZone.run( () => {
                  this.router.navigateByUrl('/');
                })
              });*/

        }, (error) => {
            alert(JSON.stringify(error, undefined, 2));
        });
  }

}
