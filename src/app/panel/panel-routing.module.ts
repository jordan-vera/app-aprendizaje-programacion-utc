import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanelPage } from './panel.page';

const routes: Routes = [
  {
    path: '',
    component: PanelPage,
    children: [
      {
        path: '',
        loadChildren: () => import('../desboard/desboard.module').then(m => m.DesboardPageModule)
      },
      {
        path: 'desboard',
        loadChildren: () => import('../desboard/desboard.module').then(m => m.DesboardPageModule)
      },
      {
        path: 'cursos',
        loadChildren: () => import('./../pagesdocentes/cursos/cursos.module').then(m => m.CursosPageModule)
      },
      {
        path: 'curso-show/:idcurso',
        loadChildren: () => import('./../pagesdocentes/curso-show/curso-show.module').then(m => m.CursoShowPageModule)
      },
      {
        path: 'clases',
        loadChildren: () => import('./../pagesdocentes/clases/clases.module').then(m => m.ClasesPageModule)
      },
      {
        path: 'clase-show/:idclase',
        loadChildren: () => import('./../pagesdocentes/clase-show/clase-show.module').then(m => m.ClaseShowPageModule)
      },

      {
        path: 'cursos-estudiantes',
        loadChildren: () => import('./../pagesestudiantes/cursos/cursos.module').then( m => m.CursosPageModule)
      },
      {
        path: 'clases-estudiantes',
        loadChildren: () => import('./../pagesestudiantes/clases/clases.module').then( m => m.ClasesPageModule)
      },
      {
        path: 'perfil-estudiante',
        loadChildren: () => import('./../pagesestudiantes/perfil-estudiante/perfil-estudiante.module').then( m => m.PerfilEstudiantePageModule)
      },
      {
        path: 'curso-show-estudiantes/:idcurso',
        loadChildren: () => import('./../pagesestudiantes/curso-show-estudiantes/curso-show-estudiantes.module').then( m => m.CursoShowEstudiantesPageModule)
      },
      {
        path: 'clase-one-estudiantes/:idcurso/:idclase',
        loadChildren: () => import('./../pagesestudiantes/clase-one/clase-one.module').then( m => m.ClaseOnePageModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelPageRoutingModule { }
