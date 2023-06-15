import { Component, OnInit } from '@angular/core';
import { ProyectoModel } from 'src/app/models/proyecto.model';
import { ProyectosService } from 'src/app/services/proyectos.service';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { style } from '@angular/animations';
import { CriterioModel } from 'src/app/models/criterio.model';
import { DisertanteModel } from 'src/app/models/disertante.model';
import { CategoriaModel } from 'src/app/models/categoria.model';
import { CategoriasService } from 'src/app/services/categorias.service';
import { CarreraModel } from 'src/app/models/carrera.model';
import { CarrerasService } from 'src/app/services/carreras.service';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-reporte-proyecto',
  templateUrl: './reporte-proyecto.component.html',
  styleUrls: ['./reporte-proyecto.component.css']
})
export class ReporteProyectoComponent implements OnInit {

  public categorias: CategoriaModel[] = [];
  public criterios: CriterioModel[] = [];
  public disertantes: DisertanteModel[] = [];
  public carreras: CarreraModel[] = [];
  public disertanteSeleccionado: DisertanteModel;
  //public carreraSeleccionada: CarreraModel;
  proyecto: ProyectoModel = new ProyectoModel();
  proyectos: ProyectoModel[] = [];
  proyectos2: ProyectoModel[] = [];
  cargando = false;


  areaSeleccionada: string;
  public carrera: string;
  categoriaSeleccionada: string;
  public categoria: string;

  constructor(  private proyectosService: ProyectosService,
                private categoriasService: CategoriasService,
                private carrerasService: CarrerasService ) {  }

  ngOnInit() {

    this.categoriasService.getCategorias()
    .subscribe( categorias => {
      this.categorias = categorias;

      this.categorias.unshift({
        descripcion: 'TODO',
        id: '',
      });
    });


    this.carrerasService.getCarreras()
    .subscribe( carreras => {
      this.carreras = carreras;
      this.carreras.unshift({
        descripcion: 'TODO',
        id: '',
      });
    });
    
    this.cargando = true;
    this.proyectosService.getProyectos()
      .subscribe( resp => {
        console.log(resp);
        this.proyectos = resp;


        //PARA IMPRIMIR DE MAYOR A MENOR DE ACUERDO AL PUNTAJE
        this.proyectos.sort((a, b) => b.totalPuntaje - a.totalPuntaje);
        
        this.cargando = false;
        
      });



      /*this.forma.controls["carrera"].valueChanges.subscribe((c: CarreraModel) => {
        console.log(c)
        //this.carrera = c
        //this.evaluadores = c.evaluadores
      });

      this.forma.controls["criterio"].valueChanges.subscribe((c: CriterioModel) => {
        console.log(c)
        //this.carrera = c
        //this.evaluadores = c.evaluadores
      });*/

      this.btnFloat();

      this.capturar();
  }
 
  capturar() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    //this.categoria = this.opcionSeleccionado;
    this.carrera = this.areaSeleccionada;
    this.categoria = this.categoriaSeleccionada;
    console.log(this.carrera);
    console.log(this.categoria);
}
  pdfMetodo(){
      
    //let areaSeleccionada = document.getElementById("areaSeleccionada");
    //console.log(areaSeleccionada);
    //alert(selected);

    this.proyectosService.getProyectos()
    .subscribe( respuesta => {


      this.proyectos = respuesta;
      /*
      ---------------------------------------------------------
      SE TIENE QUE VALIDAR CON EL AREA Y CATEGORIA SELECCIONADA
      ---------------------------------------------------------
      */
      if (this.carrera == 'TODO' && this.categoria == 'TODO') {//UFNCIONA

        this.proyectos2 = this.proyectos.filter(item => item );

      }else if(this.carrera !== 'TODO' && this.categoria !== 'TODO'){//FUNCIONA

        this.proyectos2 = this.proyectos.filter(item => item.area === this.carrera && item.categoria === this.categoria);

      }else if(this.carrera == 'TODO' && this.categoria !== 'TODO'){//NO FUNCIONA

        this.proyectos2 = this.proyectos.filter(item =>item.categoria === this.categoria);

      }else if(this.carrera !== 'TODO' && this.categoria == 'TODO'){//NO FUNCIONA

        this.proyectos2 = this.proyectos.filter(item => item.area === this.carrera);

      }
      //this.proyectos2 = this.proyectos.filter(item => (item.categoria === this.categoria && item.area === this.carrera) || (item.categoria !== this.categoria && item.area !==  this.carrera));

      //PARA IMPRIMIR DE MAYOR A MENOR DE ACUERDO AL PUNTAJE
      this.proyectos2.sort((a, b) => b.totalPuntaje - a.totalPuntaje);
    });



    const pdfDefinition: any = {

      content: [

        {
          //image: '/assets/images/logo-unican.png',
          //text: 'Listado de Proyectos\n\n',
          //style: 'encabezado',
          //alignment: 'center'
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

          /*{text: 'zebra style', margin: [0, 20, 0, 8]},
          {
            style: 'tableExample',
            table: {
              body: [
                ['Sample value 1', 'Sample value 2', 'Sample value 3'],
                ['Sample value 1', 'Sample value 2', 'Sample value 3'],
                ['Sample value 1', 'Sample value 2', 'Sample value 3'],
                ['Sample value 1', 'Sample value 2', 'Sample value 3'],
                ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ]
            },
            layout: {
              fillColor: function (rowIndex, node, columnIndex) {
                return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
              }
            }
          },*/


          /*
          {text: 'Tabla', style: 'subheader'},
          {
            style: 'tableExample',
            table: {
              headerRows: 1,
              // dontBreakRows: true,
              // keepWithHeaderRows: 1,
              body: [
                [{text: 'Título', style: 'tableHeader'}, {text: 'Autor', style: 'tableHeader'}, {text: 'Puntaje', style: 'tableHeader'}],
                [this.proyectos.map((item) => item.titulo), this.proyectos.map((item) => item.autor), this.proyectos.map((item) => item.totalPuntaje)],
   
              ]
            },
            layout: {
              fillColor: function (rowIndex, node, columnIndex) {
                return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
              }
            }
          },*/


          {

          //alignment: 'justify',
          ul:
          [ 
            this.proyectos2.map((item) => 'TÍTULO: '+item.titulo+
                                         '\nAUTOR: '+item.autor+
                                         '\nCATEGORÍA: '+item.categoria+
                                         '\nÁREA: '+item.area+
                                         '\nPUNTAJE: '+item.totalPuntaje+
                                         '\nRESUMEN: '+item.cuerpo+'\n'+'\n\n'),
          ],
          
          //pageBreak: 'before'
        }

        /*{
          text: '\nPuntaje total: '+ this.proyecto.totalPuntaje,
          style: 'total',
          alignment: 'center',
        }*/
        
        
      ],

      footer: function(currentPage, pageCount) {
        return '\n.                 Página ' + currentPage.toString() + ' de ' + pageCount;
      },

      header: function(currentPage, pageCount, pageSize) {
        // you can apply any logic and return any valid pdfmake element
        return [
          { text: 'Informe de proyectos', alignment: (currentPage % 2) ? 'center' : 'center', fontSize: 18, bold: true },
          { canvas: [ { type: 'rect', x: 170, y: 32, w: pageSize.width - 170, h: 40 } ] }
        ]
      },
      
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
          
        },
        footer: {
          alignment: 'center'
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
}
