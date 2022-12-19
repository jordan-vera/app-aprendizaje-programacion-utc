import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalEstudiantesListPage } from './modal-estudiantes-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [ModalEstudiantesListPage],
  exports: [ModalEstudiantesListPage]
})
export class ModalEstudiantesListPageModule {}
