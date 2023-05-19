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


import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { style } from '@angular/animations';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-visualizar-proyecto',
  templateUrl: './visualizar-proyecto.component.html',
  styleUrls: ['./visualizar-proyecto.component.css']
})
export class VisualizarProyectoComponent implements OnInit {

  proyectos: ProyectoModel[] = [];

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

  }

  ngOnInit() {
    //this.proyectos = resp[Object.keys(resp)[index]].category;

    this.proyectosService.getProyectos()
      .subscribe(resp => {
        console.log(resp);
        //this.proyectos = resp[Object.keys(resp)[this.proyecto.totalPuntaje]].totalPuntaje;
        this.proyectos = resp;
      });

      const id = this.route.snapshot.paramMap.get('id');
    //console.log(this.criterios.values);
    if (id !== 'nuevo') {
      this.proyectosService.getProyecto(id)
        .subscribe((resp: ProyectoModel) => {
          this.proyecto = resp;
          this.proyecto.id = id;
        });

    }

  }


  pdfMetodo(){
    const pdfDefinition: any = {
      content: [
        {
          //image: '/assets/images/logo-unican.png',
          text: 'Informe de Proyecto\n\n',
          style: 'encabezado',
          alignment: 'center'
        },
        {
          text: [
            {text: 'Título: ', fontSize: 15, bold: true}, {text: this.proyecto.titulo, fontSize: 15},"\n",
            {text: 'Autor: ', fontSize: 15, bold: true},{text: this.proyecto.autor, fontSize: 15},"\n",
            {text: 'Evaluador: ', fontSize: 15, bold: true}, {text: this.proyecto.evaluador1.nombre, fontSize: 15},"\n", 
            {text: 'Categoría: ', fontSize: 15, bold: true},{text: this.proyecto.categoria, fontSize: 15},"\n",
            {text: 'Código: ', fontSize: 15, bold: true}, {text: this.proyecto.codigo, fontSize: 15},"\n", 
            {text: 'Resumen: ', fontSize: 15, bold: true},{text: this.proyecto.cuerpo, fontSize: 15},"\n",
            //{text: 'Título: ', fontSize: 15, bold: true}, {text: this.proyecto.titulo, fontSize: 15},"\n", 
            //{text: 'Autor: ', fontSize: 15, bold: true},{text: this.proyecto.autor, fontSize: 15},"\n",
          ]
        },
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
        { text: '\nCriterios: ' ,
          style: 'criterios',
          fontSize: 15,
          bold: true },
        
        {

          //alignment: 'justify',
          ul: [ 
            
            this.proyecto.evaluador1.criterios.map((item) => '* '+item.descripcion + ' ('+item.puntajeAsignado+')')

          ]

        },
        {
          text: '\nPuntaje total: '+ this.proyecto.totalPuntaje,
          style: 'total',
          alignment: 'center',
        }
        
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

}
