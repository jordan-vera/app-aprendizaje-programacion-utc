import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClaseShowPage } from './clase-show.page';

const routes: Routes = [
  {
    path: '',
    component: ClaseShowPage
  },
  {
    path: 'modal-quizz-detalle',
    loadChildren: () => import('./modal-quizz-detalle/modal-quizz-detalle.module').then( m => m.ModalQuizzDetallePageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClaseShowPageRoutingModule {}
