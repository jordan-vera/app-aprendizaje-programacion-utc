import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalAgregarProgramaPage } from './modal-agregar-programa.page';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MonacoEditorModule.forRoot(),
  ],
  declarations: [ModalAgregarProgramaPage],
  exports: [ModalAgregarProgramaPage],
})
export class ModalAgregarProgramaPageModule {}
