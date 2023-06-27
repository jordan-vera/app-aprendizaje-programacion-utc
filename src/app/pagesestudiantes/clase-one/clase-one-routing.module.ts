import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContadorModule } from 'src/app/contador/contador.module';

import { ClaseOnePage } from './clase-one.page';

const routes: Routes = [
  {
    path: '',
    component: ClaseOnePage
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes), 
    ContadorModule
  ],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClaseOnePageRoutingModule {}
