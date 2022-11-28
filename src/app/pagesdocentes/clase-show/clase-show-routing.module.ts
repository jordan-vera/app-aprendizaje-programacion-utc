import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClaseShowPage } from './clase-show.page';

const routes: Routes = [
  {
    path: '',
    component: ClaseShowPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClaseShowPageRoutingModule {}
