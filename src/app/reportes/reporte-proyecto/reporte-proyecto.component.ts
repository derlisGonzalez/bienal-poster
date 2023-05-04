import { Component, OnInit } from '@angular/core';
import { ProyectoModel } from 'src/app/models/proyecto.model';
import { ProyectosService } from 'src/app/services/proyectos.service';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;



@Component({
  selector: 'app-reporte-proyecto',
  templateUrl: './reporte-proyecto.component.html',
  styleUrls: ['./reporte-proyecto.component.css']
})
export class ReporteProyectoComponent implements OnInit {

  proyectos: ProyectoModel[] = [];
  cargando = false;

  constructor( private proyectosService: ProyectosService ) { }

  ngOnInit() {

    this.cargando = true;
    this.proyectosService.getProyectos()
      .subscribe( resp => {
        console.log(resp);
        this.proyectos = resp;
        this.cargando = false;
      });

      

  }

  pdf(){
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
  }

}
