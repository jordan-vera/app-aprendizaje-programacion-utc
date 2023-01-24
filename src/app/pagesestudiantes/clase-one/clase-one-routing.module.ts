import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClaseOnePage } from './clase-one.page';

const routes: Routes = [
  {
    path: '',
    component: ClaseOnePage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClaseOnePageRoutingModule {}
