import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalAgregarQuizzPage } from './modal-agregar-quizz.page';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MonacoEditorModule.forRoot(),
  ],
  declarations: [ModalAgregarQuizzPage],
  exports: [ModalAgregarQuizzPage]
})
export class ModalAgregarQuizzPageModule {}
