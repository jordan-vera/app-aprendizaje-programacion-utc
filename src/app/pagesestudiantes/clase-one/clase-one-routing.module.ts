import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClaseOnePage } from './clase-one.page';

const routes: Routes = [
  {
    path: '',
    component: ClaseOnePage
  },
  {
    path: 'modal-resolucion-quizz',
    loadChildren: () => import('./modal-resolucion-quizz/modal-resolucion-quizz.module').then( m => m.ModalResolucionQuizzPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClaseOnePageRoutingModule {}
