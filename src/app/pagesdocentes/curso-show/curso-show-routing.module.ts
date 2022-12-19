import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursoShowPage } from './curso-show.page';

const routes: Routes = [
  {
    path: '',
    component: CursoShowPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursoShowPageRoutingModule {}
