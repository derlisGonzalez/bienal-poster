import { AddUsuarioComponent } from './pages/add-usuario/add-usuario.component';
import { ReporteCategoriasComponent } from './reportes/reporte-categorias/reporte-categorias.component';
import { ReporteCriteriosComponent } from './reportes/reporte-criterios/reporte-criterios.component';
import { ReporteCarrerasComponent } from './reportes/reporte-carreras/reporte-carreras.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrerasComponent } from './pages/carreras/carreras.component';
import { CarreraComponent } from './pages/carrera/carrera.component';
import { Routes, RouterModule } from '@angular/router';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { CriteriosComponent } from './pages/criterios/criterios.component';
import { CriterioComponent } from './pages/criterio/criterio.component';
import { DisertantesComponent } from './pages/disertantes/disertantes.component';
import { DisertanteComponent } from './pages/disertante/disertante.component';
import { EvaluadoresComponent } from './pages/evaluadores/evaluadores.component';
import { EvaluadorComponent } from './pages/evaluador/evaluador.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { ProyectoComponent } from './pages/proyecto/proyecto.component';
import { CalificacionesComponent } from './pages/calificaciones/calificaciones.component';

import { InicioComponent } from './pages/inicio/inicio.component';
import { ModalCalificarComponent } from './components/modal-calificar/modal-calificar.component';
import { CalificarComponent } from './pages/calificar/calificar.component';
import { AuthRoutingModule } from './auth/auth.routing';
import { ReporteProyectoComponent } from './reportes/reporte-proyecto/reporte-proyecto.component';
import { VisualizarProyectoComponent } from './reportes/reporte-proyecto/visualizar-proyecto/visualizar-proyecto.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { VisualizarCarreraComponent } from './reportes/reporte-carreras/visualizar-carrera/visualizar-carrera.component';

import { AuthGuard } from 'src/app/guard/auth.guard';


const routes: Routes = [
  //{ path: 'areas', component: CarrerasComponent, canActivate: [AuthGuard] },
  { path: 'areas', component: CarrerasComponent },
  { path: 'area/:id', component: CarreraComponent },

  { path: 'categorias', component: CategoriasComponent },
  { path: 'categoria/:id', component: CategoriaComponent },

  { path: 'criterios', component: CriteriosComponent },
  { path: 'criterio/:id', component: CriterioComponent },

  { path: 'disertantes', component: DisertantesComponent },
  { path: 'disertante/:id', component: DisertanteComponent },

  { path: 'evaluadores', component: EvaluadoresComponent },
  { path: 'evaluador/:id', component: EvaluadorComponent },

  { path: 'proyectos', component: ProyectosComponent },
  { path: 'proyecto/:id', component: ProyectoComponent },

  { path: 'calificaciones', component: CalificacionesComponent },
  { path: 'calificacion/:id', component: CalificarComponent },

  { path: 'calificar', component: ModalCalificarComponent },
  { path: 'calificar/:id', component: ModalCalificarComponent },

  { path: 'usuarios', component: UsuariosComponent },
  { path: 'usuario/:id', component: UsuarioComponent },

  { path: 'addusuarios', component: AddUsuarioComponent },

  { path: 'buscar/:termino', component: BuscadorComponent },

  //REPORTES
  { path: 'lista-proyectos', component: ReporteProyectoComponent },
  { path: 'proyecto-pdf/:id', component: VisualizarProyectoComponent },

  { path: 'lista-carreras', component: ReporteCarrerasComponent },
  { path: 'carrera-pdf/:id', component: VisualizarCarreraComponent },

  { path: 'lista-criterios', component: ReporteCriteriosComponent },
  //{ path: 'criterio-pdf/:id', component: VisualizarCarreraComponent },

  { path: 'lista-categorias', component: ReporteCategoriasComponent },

  { path: 'inicio', component: InicioComponent },

  { path: '**', pathMatch: 'full', redirectTo: '/inicio' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot( routes ),
    AuthRoutingModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
