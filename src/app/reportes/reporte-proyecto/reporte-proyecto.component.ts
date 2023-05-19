import { Component, OnInit } from '@angular/core';
import { ProyectoModel } from 'src/app/models/proyecto.model';
import { ProyectosService } from 'src/app/services/proyectos.service';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { style } from '@angular/animations';
import { CriterioModel } from 'src/app/models/criterio.model';
import { DisertanteModel } from 'src/app/models/disertante.model';
pdfMake.vfs = pdfFonts.pdfMake.vfs;



@Component({
  selector: 'app-reporte-proyecto',
  templateUrl: './reporte-proyecto.component.html',
  styleUrls: ['./reporte-proyecto.component.css']
})
export class ReporteProyectoComponent implements OnInit {

  public criterios: CriterioModel[] = [];
  public disertantes: DisertanteModel[] = [];
  //public carreras: CarreraModel[] = [];
  public disertanteSeleccionado: DisertanteModel;
  //public carreraSeleccionada: CarreraModel;
  proyecto: ProyectoModel = new ProyectoModel();
  proyectos: ProyectoModel[] = [];
  cargando = false;

  constructor( private proyectosService: ProyectosService ) { 

  
  }

  ngOnInit() {

    this.cargando = true;
    this.proyectosService.getProyectos()
      .subscribe( resp => {
        console.log(resp);
        this.proyectos = resp;
        this.cargando = false;
      });

      

      this.btnFloat();
  }

  btnFloat() {
    //a partir de que punto del scroll vertical de la ventana mostrará el botón
    //const ishow = 0
    const $divtop = document.getElementById("div-totop")
    window.addEventListener("load", function() {
      $divtop.style.display = "inherit"
        /*if(document.documentElement.scrollTop > ishow){
            $divtop.style.display = "inherit"
        }
        else {
            $divtop.style.display = "none"
        }*/
    })
}

  pdfMetodo(){
    const pdfDefinition: any = {
      content: [
        {
          //image: '/assets/images/logo-unican.png',
          text: 'Listado de Proyectos\n\n',
          style: 'encabezado',
          alignment: 'center'
        },
        /*{
          text: [
            {text: 'Título: ', fontSize: 15, bold: true}, {text: this.proyecto.titulo, fontSize: 15},"\n",
            {text: 'Autor: ', fontSize: 15, bold: true},{text: this.proyecto.autor, fontSize: 15},"\n",
            {text: 'Evaluador: ', fontSize: 15, bold: true}, {text: this.proyecto.evaluador1.nombre, fontSize: 15},"\n", 
            {text: 'Categoría: ', fontSize: 15, bold: true},{text: this.proyecto.categoria, fontSize: 15},"\n",
            {text: 'Código: ', fontSize: 15, bold: true}, {text: this.proyecto.codigo, fontSize: 15},"\n", 
            {text: 'Resumen: ', fontSize: 15, bold: true},{text: this.proyecto.cuerpo, fontSize: 15},"\n",
          ]
        },*/
        /*{
          text: 'Titulo: '+ this.proyecto.titulo,
          style: 'titulo'
        },
        {
          text: 'Autor: '+ this.proyecto.autor,
          style: 'autor'
        },
        {
          text: 'Evaluador: '+ this.proyecto.evaluador1.nombre,
          style: 'evaluador'
        },
        {
          text: 'Categoría: '+ this.proyecto.categoria,
          style: 'categoria'
        },
        {
          text: 'Codigo: '+ this.proyecto.codigo,
          style: 'codigo'
        },
        {
          text: 'Resumen: '+ this.proyecto.cuerpo,
          style: 'resumen'
        },*/
        /*{ text: '\nCriterios: ' ,
          style: 'criterios',
          fontSize: 15,
          bold: true 
          },*/
        
        {

          //alignment: 'justify',
          ul: [ 
            

            this.proyectos.map((item) => '* Titulo: '+item.titulo+
            '\n-Autor: '+item.autor+
            '\n-Puntaje: '+item.totalPuntaje+
            '\nResumen: '+item.cuerpo+'\n'+
            '___________________________________________________________________________________________'+
            '\n')

          ]

        },
        /*{
          text: '\nPuntaje total: '+ this.proyecto.totalPuntaje,
          style: 'total',
          alignment: 'center',
        }*/
        
      ],
      styles: {
        titulo: {
          fontSize: 18,
          bold: true
        },
        autor: {
          fontSize: 15,
          bold: true
        },
        encabezado: {
          fontSize: 20,
          bold: true,
          
        },
        total: {
          fontSize: 30,
          bold: true,
          
        }
      }
    }
    pdfMake.createPdf( pdfDefinition).open();
  }

  /*pdf(){
    this.proyectosService.getProyectos()
    .subscribe( resp => {
      //console.log(resp);
      this.proyectos = resp;
      //this.cargando = false;
      const pdfDefinition: any = {
        content: [
          {
            text: 'Prueba de PDF'
          }
        ]
      }
      const pdf = pdfMake.createPDF(pdfDefinition);
      pdf.open();

    });
  }*/

}
