import { CarreraModel } from 'src/app/models/carrera.model';
import { Component, OnInit } from '@angular/core';
import { CarrerasService } from 'src/app/services/carreras.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
//import html2canvas from 'html2canvas';

@Component({
  selector: 'app-reporte-carreras',
  templateUrl: './reporte-carreras.component.html',
  styleUrls: ['./reporte-carreras.component.css']
})
export class ReporteCarrerasComponent implements OnInit {

  carreras: CarreraModel[] = [];
  cargando = false;

  constructor( private carrerasService: CarrerasService ) { }

  ngOnInit() {

    this.cargando = true;
    this.carrerasService.getCarreras()
      .subscribe( resp => {
        console.log(resp);
        this.carreras = resp;
        this.cargando = false;
      });

      //console.log(this.carreras)

      this.btnFloat();

  }

  //METODO PARA BOTON FLOTANTE
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


  downloadPDF() {
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });
  }

}
