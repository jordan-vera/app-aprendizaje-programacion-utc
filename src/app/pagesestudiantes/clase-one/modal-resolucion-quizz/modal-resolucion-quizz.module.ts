import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ModalResolucionQuizzPage } from './modal-resolucion-quizz.page';
import { ContadorModule } from 'src/app/contador/contador.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContadorModule
  ],
  declarations: [ModalResolucionQuizzPage],
  exports: [ModalResolucionQuizzPage]
})
export class ModalResolucionQuizzPageModule {}
