import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalQuizzDetallePage } from './modal-quizz-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [ModalQuizzDetallePage],
  exports: [ModalQuizzDetallePage]
})
export class ModalQuizzDetallePageModule {}
