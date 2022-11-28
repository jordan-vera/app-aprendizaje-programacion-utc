import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClaseShowPageRoutingModule } from './clase-show-routing.module';

import { ClaseShowPage } from './clase-show.page';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { ModalAgregarProgramaPageModule } from './modal-agregar-programa/modal-agregar-programa.module';
import { ModalAgregarQuizzPageModule } from './modal-agregar-quizz/modal-agregar-quizz.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClaseShowPageRoutingModule,
    MonacoEditorModule,
    ModalAgregarProgramaPageModule,
    ModalAgregarQuizzPageModule
  ],
  declarations: [ClaseShowPage],
})
export class ClaseShowPageModule {}
