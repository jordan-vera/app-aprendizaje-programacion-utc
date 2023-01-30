import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstudiantesRespuestasShowPage } from './estudiantes-respuestas-show.page';

const routes: Routes = [
  {
    path: '',
    component: EstudiantesRespuestasShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstudiantesRespuestasShowPageRoutingModule {}
