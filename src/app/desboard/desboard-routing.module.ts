import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesboardPage } from './desboard.page';

const routes: Routes = [
  {
    path: '',
    component: DesboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesboardPageRoutingModule {}
