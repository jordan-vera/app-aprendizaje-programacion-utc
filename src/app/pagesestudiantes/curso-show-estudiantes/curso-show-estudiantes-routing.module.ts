import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursoShowEstudiantesPage } from './curso-show-estudiantes.page';

const routes: Routes = [
  {
    path: '',
    component: CursoShowEstudiantesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursoShowEstudiantesPageRoutingModule {}
